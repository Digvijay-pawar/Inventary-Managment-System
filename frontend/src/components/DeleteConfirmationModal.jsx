const DeleteConfirmationModal = ({ onConfirm, onCancel }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white w-full max-w-sm rounded-lg shadow-lg p-6 relative">
                <h2 className="text-xl font-bold mb-4">Are you sure you want to delete this supplier?</h2>
                <div className="flex justify-end gap-4">
                    <button type="button" className="btn btn-ghost" onClick={onCancel}>
                        Cancel
                    </button>
                    <button type="button" className="btn btn-error" onClick={onConfirm}>
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteConfirmationModal;
