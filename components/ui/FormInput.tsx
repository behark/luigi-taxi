'use client';

import { forwardRef, useId } from 'react';
import { AlertCircle, CheckCircle } from 'lucide-react';

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  hint?: string;
  isValid?: boolean;
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, error, hint, isValid, required, className = '', id: propId, ...props }, ref) => {
    const generatedId = useId();
    const id = propId || generatedId;
    const errorId = `${id}-error`;
    const hintId = `${id}-hint`;

    const describedBy = [
      error ? errorId : null,
      hint ? hintId : null,
    ].filter(Boolean).join(' ') || undefined;

    return (
      <div className="w-full">
        <label
          htmlFor={id}
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          {label}
          {required && <span className="text-red-500 ml-1" aria-hidden="true">*</span>}
        </label>
        <div className="relative">
          <input
            ref={ref}
            id={id}
            aria-required={required}
            aria-invalid={error ? 'true' : undefined}
            aria-describedby={describedBy}
            className={`
              w-full px-3 py-2 border rounded-lg transition-colors
              focus:ring-2 focus:ring-yellow-500 focus:border-transparent focus:outline-none
              bg-white dark:bg-gray-700
              text-gray-900 dark:text-white
              placeholder-gray-400 dark:placeholder-gray-500
              ${error
                ? 'border-red-500 dark:border-red-400'
                : isValid
                  ? 'border-green-500 dark:border-green-400'
                  : 'border-gray-300 dark:border-gray-600'
              }
              ${className}
            `}
            {...props}
          />
          {(error || isValid) && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              {error ? (
                <AlertCircle className="h-5 w-5 text-red-500" aria-hidden="true" />
              ) : isValid ? (
                <CheckCircle className="h-5 w-5 text-green-500" aria-hidden="true" />
              ) : null}
            </div>
          )}
        </div>
        {error && (
          <p id={errorId} className="mt-1 text-sm text-red-500 dark:text-red-400 flex items-center" role="alert">
            <AlertCircle className="h-4 w-4 mr-1 flex-shrink-0" aria-hidden="true" />
            {error}
          </p>
        )}
        {hint && !error && (
          <p id={hintId} className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {hint}
          </p>
        )}
      </div>
    );
  }
);

FormInput.displayName = 'FormInput';

interface FormTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  hint?: string;
}

export const FormTextarea = forwardRef<HTMLTextAreaElement, FormTextareaProps>(
  ({ label, error, hint, required, className = '', id: propId, ...props }, ref) => {
    const generatedId = useId();
    const id = propId || generatedId;
    const errorId = `${id}-error`;
    const hintId = `${id}-hint`;

    const describedBy = [
      error ? errorId : null,
      hint ? hintId : null,
    ].filter(Boolean).join(' ') || undefined;

    return (
      <div className="w-full">
        <label
          htmlFor={id}
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          {label}
          {required && <span className="text-red-500 ml-1" aria-hidden="true">*</span>}
        </label>
        <textarea
          ref={ref}
          id={id}
          aria-required={required}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={describedBy}
          className={`
            w-full px-3 py-2 border rounded-lg transition-colors
            focus:ring-2 focus:ring-yellow-500 focus:border-transparent focus:outline-none
            bg-white dark:bg-gray-700
            text-gray-900 dark:text-white
            placeholder-gray-400 dark:placeholder-gray-500
            ${error
              ? 'border-red-500 dark:border-red-400'
              : 'border-gray-300 dark:border-gray-600'
            }
            ${className}
          `}
          {...props}
        />
        {error && (
          <p id={errorId} className="mt-1 text-sm text-red-500 dark:text-red-400 flex items-center" role="alert">
            <AlertCircle className="h-4 w-4 mr-1 flex-shrink-0" aria-hidden="true" />
            {error}
          </p>
        )}
        {hint && !error && (
          <p id={hintId} className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {hint}
          </p>
        )}
      </div>
    );
  }
);

FormTextarea.displayName = 'FormTextarea';

interface FormSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
  hint?: string;
  options: { value: string; label: string }[];
}

export const FormSelect = forwardRef<HTMLSelectElement, FormSelectProps>(
  ({ label, error, hint, options, required, className = '', id: propId, ...props }, ref) => {
    const generatedId = useId();
    const id = propId || generatedId;
    const errorId = `${id}-error`;
    const hintId = `${id}-hint`;

    const describedBy = [
      error ? errorId : null,
      hint ? hintId : null,
    ].filter(Boolean).join(' ') || undefined;

    return (
      <div className="w-full">
        <label
          htmlFor={id}
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          {label}
          {required && <span className="text-red-500 ml-1" aria-hidden="true">*</span>}
        </label>
        <select
          ref={ref}
          id={id}
          aria-required={required}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={describedBy}
          className={`
            w-full px-3 py-2 border rounded-lg transition-colors
            focus:ring-2 focus:ring-yellow-500 focus:border-transparent focus:outline-none
            bg-white dark:bg-gray-700
            text-gray-900 dark:text-white
            ${error
              ? 'border-red-500 dark:border-red-400'
              : 'border-gray-300 dark:border-gray-600'
            }
            ${className}
          `}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && (
          <p id={errorId} className="mt-1 text-sm text-red-500 dark:text-red-400 flex items-center" role="alert">
            <AlertCircle className="h-4 w-4 mr-1 flex-shrink-0" aria-hidden="true" />
            {error}
          </p>
        )}
        {hint && !error && (
          <p id={hintId} className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {hint}
          </p>
        )}
      </div>
    );
  }
);

FormSelect.displayName = 'FormSelect';
