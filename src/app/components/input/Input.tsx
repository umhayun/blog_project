interface TextInputProps {
  label: string;
  value: string | number;
  placeholder?: string;
  onChange: (value: string) => void;
  unit?: string;
}

export const TextInput = ({ label, value, placeholder, onChange, unit }: TextInputProps) => (
  <div className="mb-4">
    <label className="block text-gray-400 text-sm mb-2">{label}</label>
    <div className="relative">
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-black border border-gray-600 rounded px-3 py-2 pr-12 text-white placeholder-gray-400 focus:border-gray-400 focus:outline-none"
      />
      {unit && <span className="absolute right-3 top-2 text-gray-400">{unit}</span>}
    </div>
  </div>
)
