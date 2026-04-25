import React from 'react';

const GenerateQuoteButton = ( { onSubmit, wasmStatus } ) => {
    return (<div className="pt-6">
        <button
            type="submit"
            disabled={wasmStatus.state === 'loading'}
            className={`
      group relative w-full overflow-hidden rounded-xl py-4 px-6 text-l font-semibold tracking-wide transition-all duration-200 shadow-sm
      ${wasmStatus.state === 'loading'
                    ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                    : 'bg-emerald-600 text-white hover:bg-emerald-700 hover:shadow-emerald-200/50 hover:shadow-lg active:scale-[0.98] cursor-pointer'
                }
    `}
        >
            <div className="flex items-center justify-center gap-3">
                {wasmStatus.state === 'loading' && (
                    <svg className="animate-spin h-5 w-5 text-slate-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                )}

                <span>
                    {wasmStatus.state === 'loading' ? 'Preparing Quotation...' : 'Generate Quotation'}
                </span>
            </div>
        </button>
    </div>
    );
}

export default GenerateQuoteButton;