export default function Trailer(props: {trailerUrl: string}){
    return (
        <div className='relative pt-[54.25%] mt-4 rounded-2xl m-2 md:m-4'>
          <iframe
            src={`https://www.youtube.com/embed/${props.trailerUrl}`}
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
            allowFullScreen
            className='absolute top-0 left-0 h-full w-full rounded-2xl'
          ></iframe>
        </div>
    )
}