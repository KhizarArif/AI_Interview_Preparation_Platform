export async function GET() {
    return Response.json({ success: true, message: "Thank you!" }, {status: 200});
}