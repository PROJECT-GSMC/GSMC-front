"use client"

interface ConfirmModalProps {
  description: string;
  title: string;
  confirm: { label: string; onClick: () => void };
  cancel: { label: string; onClick: () => void };
}

const ConfirmModal = ({ description, title, confirm, cancel }: ConfirmModalProps) => {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <article className="w-[26.25rem] h-[12.6875rem] flex flex-col justify-between bg-white rounded-[0.75rem] pt-4 px-[1.5rem]">
        <section className='flex flex-col items-start p-4 gap-4'>
          <h2 className='text-body1s'>
            {title}
          </h2>
          <small className='font-normal text-[1.125rem] text-gray-400'>
            {description}
          </small>
        </section>
        <section className='flex justify-center items-center'>
          <button
            className='flex-1 flex flex-col justify-center items-center py-4 px-2 text-[#0075C2]'
            onClick={cancel.onClick}
          >
            {cancel.label}
          </button>
          <button
            className='flex-1 flex flex-col justify-center items-center py-4 px-2 text-errors-500'
            onClick={confirm.onClick}
          >
            {confirm.label}
          </button>
        </section>
      </article>
    </div>
  );
};

export default ConfirmModal;