import Providers from './providers'

export default function Description(props: { movieData: any, mediaType:string }) {
  return (
    <div className="bg-surface1 rounded-2xl mx-2 md:mx-4 mt-4 p-4 flex flex-col md:flex-row gap-4 shadow-outer">
      
      <div className="md:basis-2/3">
      {props.movieData.overview} <br /> <br />
      {props.movieData.budget ? <><a className="font-bold">budget: </a> {(props.movieData.budget).toLocaleString('en-US')}$ <br /></> : null}
      {props.movieData.revenue ? <><a className="font-bold">revenue: </a> {(props.movieData.revenue).toLocaleString('en-US')}$ <br /></> : null}
      <a className="font-bold">genre: </a>{props.movieData['genres'].map((genre: any) => genre.name).join(', ')}
      </div>

      <div className="bg-surface2 rounded-xl p-4 flex-1 shadow-outer2">
        <a className="text-3xl font-bold">Stream now:</a> <br />
        <Providers movieData={props.movieData} mediaType={props.mediaType}/>
      </div>
    </div>
  );
}
