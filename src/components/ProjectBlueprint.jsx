const drawings = {
  house: (
    <>
      <path d="M12 48 50 18l39 30M20 44v38h60V44M40 82V56h22v26M28 53h8v12h-8zM66 53h8v12h-8z" />
      <path d="M8 84h86M15 88h72M50 18v-8m-4 0h8M24 43h52M16 36l-6 4m74-4 6 4" />
    </>
  ),
  table: (
    <>
      <path d="M18 34h64v8H18zM25 42v34m50-34v34M16 76h68M27 48h46" />
      <path d="M24 28h10v6H24zM66 28h10v6H66zM32 20h36M36 16v4m28-4v4M11 84h78M18 80v8m64-8v8" />
    </>
  ),
  orchard: (
    <>
      <path d="M8 75h84M20 74V48m0 0-9-10m9 10 9-13m15 39V41m0 0-10-12m10 12 11-15m18 48V47m0 0-9-12m9 12 10-13" />
      <circle cx="20" cy="34" r="11" /><circle cx="46" cy="26" r="12" /><circle cx="72" cy="34" r="11" />
      <path d="M14 49h12m-18 33h76M36 81l10-8m0 8-10-8m27 8 10-8m0 8-10-8" />
    </>
  ),
}

export default function ProjectBlueprint({ type }) {
  return (
    <svg className="project-blueprint" viewBox="0 0 100 100" aria-hidden="true">
      {drawings[type]}
    </svg>
  )
}
