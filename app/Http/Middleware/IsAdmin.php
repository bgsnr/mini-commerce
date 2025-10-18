<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class IsAdmin
{
    public function handle(Request $request, Closure $next): Response
    {
        // Cek jika pengguna sudah login dan adalah seorang admin
        if ($request->user() && $request->user()->is_admin) {
            // Jika ya, izinkan masuk
            return $next($request);
        }
        // Jika tidak, tolak akses
        abort(403, 'Unauthorized action.');
    }
}