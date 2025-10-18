use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id(); // Kolom 'id', auto-increment, primary key
            $table->string('name'); // Kolom 'name' untuk nama pengguna
            $table->string('email')->unique(); // Kolom 'email', harus unik
            $table->timestamp('email_verified_at')->nullable(); // Opsional, untuk verifikasi email
            $table->string('password'); // Kolom 'password' untuk hash
            $table->rememberToken(); // Opsional, untuk fitur "remember me"
            $table->timestamps(); // Membuat kolom 'created_at' dan 'updated_at'
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};