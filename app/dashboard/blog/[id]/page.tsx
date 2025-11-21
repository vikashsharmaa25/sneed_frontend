import CreateBlogMain from "@/components/blog-management/create-blog/CreateBlogMain"

export default async function EditBlogPage({ params }: any) {
    const { id } = await params
    console.log(id, 'router')
    return (
        <>
            <CreateBlogMain editId={id} />
        </>
    );
}
