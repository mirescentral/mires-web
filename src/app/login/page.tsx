import { login } from './actions';
import { Lock } from 'lucide-react';
import Image from 'next/image';
import logomires from '@/app/logo-mires.png'; // Asegúrate de que la extensión sea correcta

export default function LoginPage({
  searchParams,
}: {
  searchParams: { error: string };
}) {
  return (
    <div className="min-h-screen bg-[#F5F0E8] flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-lg p-10 border border-gray-100">
        
        <div className="flex justify-center mb-8">
          <Image src={logomires} alt="mires Logo" width={150} height={50} className="object-contain" />
        </div>

        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-50 rounded-full text-[#1A2E4A] mb-4">
            <Lock size={24} />
          </div>
          <h1 className="text-2xl font-serif text-[#1A2E4A] font-bold">Acceso Administrativo</h1>
          <p className="text-gray-500 text-sm mt-2">Ingresa tus credenciales autorizadas.</p>
        </div>

        <form action={login} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Correo Electrónico</label>
            <input 
              name="email" 
              type="email" 
              required 
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#E8863A] focus:border-transparent outline-none transition-all" 
              placeholder="admin@mires.cl" 
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Contraseña</label>
            <input 
              name="password" 
              type="password" 
              required 
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#E8863A] focus:border-transparent outline-none transition-all" 
              placeholder="••••••••" 
            />
          </div>

          {searchParams?.error && (
            <p className="text-red-500 text-sm font-medium text-center bg-red-50 py-2 rounded-lg">
              Correo o contraseña incorrectos.
            </p>
          )}

          <button 
            type="submit" 
            className="w-full bg-[#1A2E4A] text-white font-semibold py-4 rounded-xl hover:bg-[#0f1d30] transition-colors"
          >
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
}