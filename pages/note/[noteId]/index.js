import { useRouter } from "next/router";
import Layout from "@/components/layout";
import { getData, deleteData, updateData } from "@/utils/api";
import { useState, useEffect } from "react";
import Link from "next/link";
import { format } from "date-fns";

function NoteDetail({ note, ENDPOINT_API }) {
  const [title, setTitle] = useState(note.title);
  const [description, setDescription] = useState(note.description);

  const formatDate = (date) => {
    return format(new Date(date), "dd/MM/yyyy");
  };

  const handleChangeTitle = (event) => {
    setTitle(event.target.value);
  };

  const deleteNote = async (event) => {
    let confirmation = confirm("Apakah Anda ingin menghapus note ini ?");
    if (confirmation) {
      try {
        const noteId = event.currentTarget.getAttribute("data-noteid");
        const response = await deleteData(ENDPOINT_API + `/${noteId}`);
        const allNotes = await getAllNote();
        setNotes(allNotes);
      } catch (error) {
        alert(error);
      }
    }
  };

  const updateNote = async () => {
    const data = {
      title,
      description,
    };
    try {
      const response = await updateData(`${ENDPOINT_API}/${note.id}`, data);
      alert("Berhasil menyimpan catatan!");
    } catch (error) {
      alert(error);
    }
  };

  const handleChangeDesc = (event) => {
    setDescription(event.target.value);
  };

  const getAllNote = async () => {
    const response = await getData(ENDPOINT_API);
    console.log(response);
    return response.data;
  };

  // Mendapatkan data catatan dan menyimpannya di dalam state
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const allNotes = await getAllNote();
      setNotes(allNotes);
    };
    setTitle(note.title);
    setDescription(note.description);
    fetchData();
  }, [note.title, note.description]);
  return (
    <Layout>
      {{
        form: (
          <div className="col-span-5 p-2">
            <div className="my-2">
              <p className="font-bold focus:border-transparent text-sm">
                Judul Catatan
              </p>
              <input
                name="title"
                type="text"
                value={title}
                onChange={handleChangeTitle}
                className="py-2 w-full border-b border-b-gray-500 text-sm focus:outline-none"
                placeholder="Masukan judul"
              />
            </div>
            <div className="my-2">
              <p className="font-bold focus:border-transparent text-sm">
                Isi Catatan
              </p>
              <textarea
                name="description"
                value={description}
                onChange={handleChangeDesc}
                className="py-2 rounded mt-2 w-full border-b border-b-gray-500 text-sm focus:outline-none"
                rows={30}
                cols={50}
              ></textarea>
            </div>
            <div className="flex justify-end w-full">
              <button
                type="submit"
                onClick={updateNote}
                className="py-2 px-4 bg-blue-500 rounded-md text-white text-xs"
              >
                Simpan Catatan
              </button>
            </div>
          </div>
        ),
        addNote: (
          <>
            <Link
              href="/"
              className="flex items-center justify-center p-2 font-bold rounded text-xs text-center w-full bg-blue-500 text-white"
            >
              <svg
                viewBox="0 0 24 24"
                width="24"
                height="24"
                stroke="currentColor"
                stroke-width="2"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="css-i6dzq1"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="12" y1="18" x2="12" y2="12"></line>
                <line x1="9" y1="15" x2="15" y2="15"></line>
              </svg>
              <p className="text-xs ml-2">
                Tambah Catatan
              </p>
            </Link>
          </>
        ),
        list: (
          <>
            {notes.map((listNote) => (
              <div
                className={`p-2 my-2 shadow ${
                  listNote.id == note.id
                    ? "bg-gray-200 shadow border-2 border-slate-300"
                    : ""
                } border-gray-200 border rounded-md relative`}
              >
                <button
                  onClick={deleteNote}
                  data-noteid={listNote.id}
                  className={`absolute top-[-10px] right-[-5px] ${
                    listNote.id == note.id ? "hidden" : ""
                  }`}
                >
                  <svg
                    viewBox="0 0 24 24"
                    width="20"
                    height="20"
                    stroke="red"
                    stroke-width="2"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="css-i6dzq1"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="15" y1="9" x2="9" y2="15"></line>
                    <line x1="9" y1="9" x2="15" y2="15"></line>
                  </svg>
                </button>
                <Link href={`/note/${listNote.id}`} key={listNote.id}>
                  <div className="pointer ">
                    <p className="text-xs font-bold text-yellow-600">Judul: </p>
                    <p className="text-[10px]">{listNote.title}</p>
                    <span className="font-bold text-green-700 text-[4px] flex justify-end mt-2">
                      {formatDate(listNote.createdAt)}
                    </span>
                  </div>
                </Link>
              </div>
            ))}
          </>
        ),
      }}
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { query } = context;
  const { noteId } = query;
  const response = await getData(`${process.env.ENDPOINT_API}/${noteId}`);
  const note = response.data;
  if (!note) {
    return {
      redirect: {
        destination: '/404',
        permanent: false,
      },
    };
  }
  return {
    props: {
      ENDPOINT_API: process.env.ENDPOINT_API,
      noteId,
      note,
    },
  };
}

export default NoteDetail;
