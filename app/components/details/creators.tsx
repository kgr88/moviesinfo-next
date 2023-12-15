export default function Creators(props: { credits: any; releaseDate: string }) {
  const director = props.credits.crew.filter(({ job }) => job === 'Director');
  const writer = props.credits.crew.filter(
    ({ job }) => job === 'Screenplay' || job === 'Writer'
  );
  const composer = props.credits.crew.filter(
    ({ job }) => job === 'Original Music Composer'
  );

  const summary = {
    Director: director.map((director) => director.name).join(', '),
    Writer: writer.map((writer) => writer.name).join(', '),
    Composer: composer[0]?.name,
  };
  return (
    <div>
      {/* <a className='font-bold'>Director: </a>
      <a>{director.map((director) => director.name).join(', ')}</a> <br />
      <a className='font-bold'>Writer: </a>
      {writer.map((writer) => writer.name).join(', ')} <br />
      <a className='font-bold'>Release Date: </a> {props.releaseDate} <br />
      <a className='font-bold'>Music: </a>
  {composer[0]?.name}*/}

      {Object.entries(summary).map(([key, value]) => {
        if(value){
        return (
          <>
            <a className='font-bold'>{key}: </a>
            <a>{value}</a> <br />
          </>
        )};
      })}
    </div>
  );
}
