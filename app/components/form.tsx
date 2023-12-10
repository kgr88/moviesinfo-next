import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

async function create(formData: FormData) {
  "use server";
  const query = formData.get("query");
  revalidatePath("/");
  redirect(`/search/?query=${query}`);
}

export default function Form() {
  return (
    <div className="bg-gray-700 w-full h-30">
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full h-30"
        action={create}
      >
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          id="query"
          name="query"
        />
        <input
          className="mt-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline grid content-center"
          type="submit"
          value="Submit"
        />
      </form>
    </div>
  );
}
