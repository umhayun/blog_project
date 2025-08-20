interface NumberInputProps {
  label: string;
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
  min?: number;
  max?: number;
  unit?: string;
  info?: string
}

export const NumberInput = ({ label, value, placeholder, onChange, min, max, unit, info }: NumberInputProps) => (
  <div className="bg-black p-6 rounded-lg">
    <label className="block text-gray-400 text-sm mb-2">{label}</label>
    <div className="relative">
      <input
        type="number"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-black border border-gray-600 rounded px-3 py-2 pr-6 text-white placeholder-gray-400 focus:border-gray-400 focus:outline-none"
        min={min}
        max={max}
      />
      {unit && <span className="absolute right-3 top-2 text-gray-400">{unit}</span>}
      {info && <p className="text-gray-500 text-xs mt-2">{info}</p>}
    </div>
  </div>
)       