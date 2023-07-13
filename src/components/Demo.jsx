import { useEffect, useState  } from "react"
import { copy, linkIcon, loader, tick  } from "../assets"
import { useLazyGetSummaryQuery } from "../services/articel"
function Demo() {
  const [article, setArticle ] = useState({
    url:'',
    summary:''
  })

  const[getSummary,{error,isFitching }]= useLazyGetSummaryQuery()

  const handleSubmit = async (e) =>{
    e.preventDefault()
    const {data} =await getSummary({articleUrl:article.url})
    if(data?.summary){
      const newArticle = {...article,summary:data.summary}
      setArticle(newArticle)
      console.log(newArticle)
    }
  }

  return (
    <section className="mt-16 w-full max-w-xl">
      <div className="flex flex-col w-full gap-2">
        <form
          className="relative flex justify-center items-center"
          onSubmit={handleSubmit}
        >
          <img
            src={linkIcon}
            alt="link-icon"
            className="absolute left-0 my-2 ml-3 w-5"
          />
          <input
            type="url"
            placeholder="Enter a URL"
            value= {article.url}
            required
            onChange={(e) => {setArticle({
              ...article,
              url: e.target.value
            })}}
            className="peer block w-full rounded-md border border-gray-200 bg-white py-2.5 pl-10 pr-12 text-sm shadow-lg font-satoshi font-medium focus:border-black focus:outline-none focus:ring-0"
          />
          <button
            type="submit"
            className="hover:border-gray-700 hover:text-gray-700 absolute inset-y-0 right-0 my-1.5 mr-1.5 flex w-10 items-center justify-center rounded border border-gray-200 font-sans text-sm font-medium text-gray-400 peer-focus:border-gray-700 peer-focus:text-gray-700"
          >
            ↵
          </button>
        </form>
        {/* Browser URL History */}
      </div>
    </section>
  );
}

export default Demo