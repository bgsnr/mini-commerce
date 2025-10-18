@extends('layouts.app')

@section('content')
<div class="container">
    <h1>Admin Dashboard</h1>
    <p>Hai, {{ auth()->user()->name }}! Kamu login sebagai admin.</p>
</div>
@endsection
