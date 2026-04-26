<?php

namespace App\Providers;

use Doctrine\SqlFormatter\NullHighlighter;
use Doctrine\SqlFormatter\SqlFormatter;
use Illuminate\Auth\Notifications\VerifyEmail;
use Illuminate\Database\Events\QueryExecuted;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Str;
use Symfony\Component\Console\Output\ConsoleOutput;
use Symfony\Component\Console\Output\OutputInterface;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        DB::listen(function (QueryExecuted $query) {
            if (app()->runningInConsole()) return;
            if (request() && request()->is('sanctum/*') || request()->routeIs('login', 'password.*')) return;
            if (Str::contains(str($query->sql)->lower()->replace(['`','"'], ''), $query->connection->getTablePrefix().'personal_access_tokens')) return;

            $sql = (new SqlFormatter(new NullHighlighter()))->format($query->toRawSql(), "    ");
            $keywords = [
                'select','from','where','join','inner join','left join','right join',
                'group by','order by','having','limit','offset','and','or','on','as', 'delete'
            ];
            $pattern = '/\b(' . implode('|', array_map('preg_quote', $keywords)) . ')\b/i';
            $sql = preg_replace_callback($pattern, fn($m) => strtoupper($m[1]), $sql);

            $output = new ConsoleOutput(OutputInterface::VERBOSITY_VERBOSE, true);
            foreach (explode("\n", $sql) as $line) {
                $output->writeln("<comment>$line</comment>");
            }
            $output->writeln("<comment>".sprintf('(%.2f ms)', $query->time ?? 0)."</comment>");
        });
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        VerifyEmail::toMailUsing(function ($notifiable, string $url) {
            $frontendUrl = rtrim(config('app.frontend_url', 'http://localhost:5173'), '/');
            $parts = parse_url($url);
            parse_str($parts['query'] ?? '', $query);
            $verifyUrl = $frontendUrl
                . '/verify-email/' . $notifiable->getKey()
                . '/' . sha1($notifiable->getEmailForVerification())
                . '?' . http_build_query($query);
            return (new \Illuminate\Notifications\Messages\MailMessage)
                ->subject('Xác thực địa chỉ email')
                ->line('Vui lòng nhấn nút bên dưới để xác thực email của bạn.')
                ->action('Xác thực email', $verifyUrl)
                ->line('Nếu bạn không tạo tài khoản, hãy bỏ qua email này.');
        });
    }
}
