export const Header = () => {
  return (
    <div
      className="relative h-50 bg-gradient-to-r from-purple-400 via-purple-500 to-indigo-600 overflow-hidden rounded-lg my-4"
      style={{
        background: "linear-gradient(to right, #8f94fb, #4e54c8)",
      }}
    >
      {/* Background company image with overlay */}
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/416405/pexels-photo-416405.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop"
          alt="Empresa"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
        <div className="flex items-center gap-6">
          {/* Circular Logo */}
          <div className="flex-shrink-0">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg">
              <img
                className="rounded-full"
                src="https://media.licdn.com/dms/image/v2/C4E0BAQFqyf2mpBoA-g/company-logo_200_200/company-logo_200_200/0/1630594711947/oriontek_logo?e=2147483647&v=beta&t=CfQM8JG6VzEwkxQHXzuquC8cOfF3NvYtXC3UwlFU9q0"
                alt=""
              />
            </div>
          </div>

          {/* Title and Description */}
          <div className="text-left">
            <h1 className="text-4xl font-bold text-white mb-3 drop-shadow-lg">
              Gestión de Usuarios y Direcciones
            </h1>
            <p className="text-lg text-white/80 mt-2 drop-shadow-sm">
              Bienvenido a oriontek
            </p>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
      <div className="absolute bottom-20 right-32 w-24 h-24 bg-white/5 rounded-full blur-lg"></div>
    </div>
  );
};
