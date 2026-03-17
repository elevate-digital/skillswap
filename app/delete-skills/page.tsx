'use client';

import axios from "axios";


async function deleteAllSkills() {
  const token = localStorage.getItem("token");

  const { data } = await axios.get("/api/skill");

  await Promise.all(
    data.map((skill: any) =>
      axios.delete(`/api/skill/${skill.id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
    )
  );

  console.log("Alle skills verwijderd");
}

export default function DeleteSkills() {
  return (  
    <main id="inhoud" className="py-[1em] md:py-[2em] flex flex-col gap-5">

      <button onClick={deleteAllSkills} className="cursor-pointer">
        Verwijder alle skills
      </button>

    </main>
  )
}