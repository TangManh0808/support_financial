export const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-xl shadow p-6 ${className}`}>
    {children}
  </div>
);

export const CardHeader = ({ title, children }) => (
  <div className="flex justify-between items-center mb-4">
    <h2 className="font-semibold text-lg text-gray-900">{title}</h2>
    {children && <div>{children}</div>}
  </div>
);

export const CardContent = ({ children }) => (
  <div className="text-sm text-gray-800">{children}</div>
);
