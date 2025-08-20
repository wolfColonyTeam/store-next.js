import { auth } from "@/auth";

export async function POST(req: Request) { //for admin operation - API protection
  const session = await auth();    //reading session cookie user

  if (!session || session.user?.role !== "admin") {
    return new Response("Forbidden", { status: 403 });
  }

  //TODO - admin logic: update  content
  const body = await req.json();

  return new Response(JSON.stringify({ success: true }));
}
