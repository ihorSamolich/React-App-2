// TextInput.tsx
import React, { forwardRef } from 'react';

interface ITextInputProps {
  placeholder: string;
  value?: string;
}

const TextInput: React.ForwardRefRenderFunction<HTMLInputElement, ITextInputProps> = ({ placeholder, value }, ref) => {
  return (
    <input
      ref={ref}
      placeholder={placeholder}
      defaultValue={value}
      className="bg-white px-2 rounded-lg border border-gray-200 outline-0 h-full"
    />
  );
};

export default forwardRef(TextInput);
