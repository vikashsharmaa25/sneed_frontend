import { Button } from '@/components/ui/button'

function CreateBlogHeader({ handleSubmit, loading, disabled = false, isEditMode = false }: any) {
    const buttonText = isEditMode
        ? (loading ? "Updating..." : "Update")
        : (loading ? "Adding..." : "Add Blog");
    const headerText = isEditMode ? "Edit Blog" : "Add Blog";

    return (
        <div className="cardBg flex items-center justify-between rounded-lg">
            <h2>{headerText}</h2>
            <div className="flex items-center gap-3">
                <Button
                    onClick={handleSubmit}
                    className="bg-red-600 hover:bg-red-700 text-white"
                    disabled={loading || disabled}
                >
                    {buttonText}
                </Button>
            </div>
        </div>
    )
}

export default CreateBlogHeader