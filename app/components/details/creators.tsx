export default function Creators(props: { credits: any; releaseDate: string }) {
  const director = props.credits.crew.filter(({ job }) => job === "Director")
  const writer = props.credits.crew.filter(
    ({ job }) => job === "Screenplay" || job === "Writer"
  )
  const composer = props.credits.crew.filter(
    ({ job }) => job === "Original Music Composer"
  )
  return (
    <div>
      <a className="font-bold">Director: </a>
      <a>{director.map((director) => director.name).join(", ")}</a> <br />
      <a className="font-bold">Writer: </a>
      {writer.map((writer) => writer.name).join(", ")} <br />
      <a className="font-bold">Release Date: </a> {props.releaseDate} <br />
      <a className="font-bold">Music: </a>
      {composer[0]?.name}
    </div>
  )
} 
