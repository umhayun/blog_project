interface SelectInputProps {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}

export const SelectInput = ({ label, value, options, onChange }: SelectInputProps) => (
  <div className="bg-black p-6 rounded-lg">
    <label className="block text-gray-400 text-sm mb-2">{label}</label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full bg-black border border-gray-600 rounded px-3 py-2 text-white focus:border-gray-400 focus:outline-none"
    >
      {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
    </select>
  </div>
)
