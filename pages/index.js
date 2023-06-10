import Image from "next/image";
import Layout from "@/components/layout";
import { postData, getData, deleteData } from "@/utils/api";
import { useState, useEffect } from "react";
import Link from "next/link";
import { format } from "date-fns";

export async function getServerSideProps() {
  return {
    props: {
      ENDPOINT_API: process.env.ENDPOINT_API,
    },
  };
}

export default function Home({ ENDPOINT_API }) {
  const [title, setTitle] = useState([]);
  const [description, setDescription] = useState([]);

  const formatDate = (date) => {
    return format(new Date(date), "dd/MM/yyyy");
  };
  
  const deleteNote = async (event) => {
    let confirmation = confirm("Apakah Anda ingin menghapus note ini ?");
    if(confirmation) {
      try {
        const noteId = event.currentTarget.getAttribute('data-noteid');
        const response = await deleteData(ENDPOINT_API+`/${noteId}`);
        const allNotes = await getAllNote();
        setNotes(allNotes);
      } catch (error) {
        alert(error);
      }
    }
  }

  const handleChangeTitle = (event) => {
    setTitle(event.target.value);
  };

  const handleChangeDesc = (event) => {
    setDescription(event.target.value);
  };

  const submitNewNote = async () => {
    const data = {
      title,
      description,
    };
    try {
      const response = await postData(ENDPOINT_API, data);
      setTitle("");
      setDescription("");
      const allNotes = await getAllNote();
      setNotes(allNotes);
    } catch (error) {
      alert(error);
    }
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

    fetchData();
  }, []);

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
                onClick={submitNewNote}
                className="py-2 px-4 bg-green-500 rounded-md text-white text-xs"
              >
                Buat Catatan
              </button>
            </div>
          </div>
        ),
        list: (
          <>
            {notes.map((note) => (
              <div className="p-2 my-2 shadow  border-gray-200 border rounded-md relative">
                <button onClick={deleteNote} data-noteid={note.id} className="absolute top-[-10px] right-[-5px]">
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
                <Link href={`/note/${note.id}`} key={note.id}>
                  <div className="pointer ">
                    <p className="text-xs font-bold text-yellow-600">Judul: </p>
                    <p className="text-[10px]">{note.title}</p>
                    <span className="font-bold text-green-700 text-[4px] flex justify-end mt-2">
                      {formatDate(note.createdAt)}
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
