import { useEffect, useState } from "react";
import Fans from "../hook/fans";
import useAxiosPublic from "../hook/useAxiosPublic";



const FeaturedFans = () => {

    const [fans, setfans] = useState([]);
    const [count, setCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(6)
    const [filter, setFilter] = useState("");

    // categoriaztion
    const [brandFilter, setBrandfilter] = useState("")
    const [categoryFilter, setCategoryfilter] = useState("")
    const [priceRangefilter, setpriceRangefilter] = useState([1, 100])

    const axiosPublic = useAxiosPublic()



    const handleSearch = (e) => {
        e.preventDefault()
        console.log(e.target.search.value)
        setFilter(e.target.search.value)
        setCurrentPage(1)

    }

    useEffect(() => {
       const fetchData = async()=>{
        const res = await axiosPublic.get(`/pagination`,{
            params: {
                page: currentPage,
                size: itemsPerPage,
                filter: filter,
                brand: brandFilter,
                category: categoryFilter,
                minPrice: priceRangefilter[0],
                maxPrice: priceRangefilter[1],
            }
        })
        const {products, totalCount} = res.data
        setfans(products)
        setCount(totalCount) 
       }

       fetchData()
    }, [ currentPage, itemsPerPage, filter,  brandFilter, categoryFilter, priceRangefilter]);

    useEffect(() => {
        const fetchCount = async () => {
            const response = await axiosPublic.get('/count', {
                params: {
                    brand: brandFilter,
                    category: categoryFilter,
                    minPrice: priceRangefilter[0],
                    maxPrice: priceRangefilter[1],
                },
            });
            setCount(response.data.count);
        };

        fetchCount();
    }, [ brandFilter, categoryFilter, priceRangefilter]);
    console.log(count)

    const numberOfPages = Math.ceil(count / itemsPerPage);
    const pages = [...Array(numberOfPages).keys()].map((el) => el + 1);


    const handlePaginationBtn = (value) => {
        setCurrentPage(value);
    };

    const handleAscend = (ascend) => {
        if (ascend === 'timestamp') {
            const sortedproducts = fans.slice().sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
            console.log(sortedproducts)
            setfans(sortedproducts)


        }

    }

    const handleDescend = (descend) => {
        if (descend === 'timestamp') {
            const sortedproducts = fans.slice().sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
            console.log(sortedproducts)
            setfans(sortedproducts)


        }
    }

    const handlepriceDescend = (descend) => {
        if (descend === 'price') {
            const priceCount = fans.slice().sort((a, b) => b.price - a.price)
            setfans(priceCount)

        }
    }
    const handlepriceAscend = (ascend) => {
        if (ascend === 'price') {
            const priceCount = fans.slice().sort((a, b) => a.price - b.price)
            setfans(priceCount)

        }
    }

    const handleFilters = (e) =>{

     
       const {name, value} = e.target

       if(name === 'brand'){
         setBrandfilter(value)
       }

       else if(name === 'category'){
        setCategoryfilter(value)
       }

       else if(name === 'priceRange'){
        const priceRange = value.split('-').map(Number)
        setpriceRangefilter(priceRange)
       }

        //    pagination reset

        setCurrentPage(1)
    }







    return (
        <div>
            {/*  */}

            {/* pagination */}
            <div className="flex justify-center items-center gap-5 mb-10">



                <button
                    disabled={currentPage === 1}
                    onClick={() => handlePaginationBtn(currentPage - 1)}
                    className="px-4 py-2 mx-1 text-gray-700 disabled:text-gray-500 capitalize bg-gray-200 rounded-md disabled:cursor-not-allowed disabled:hover:bg-gray-200 disabled:hover:text-gray-500 hover:bg-blue-950 hover:text-white"
                >
                    <div className="flex items-center -mx-1">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-6 h-6 mx-1 rtl:-scale-x-100"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M7 16l-4-4m0 0l4-4m-4 4h18"
                            />
                        </svg>

                        <span className="mx-1">previous</span>
                    </div>
                </button>

                {/* pagination section  */}

                {pages.map((btnNum) => (
                    <button
                        onClick={() => handlePaginationBtn(btnNum)}
                        key={btnNum}
                        className={`hidden px-4 py-2 ${currentPage === btnNum ? "bg-blue-950 text-white" : ""
                            } mx-1 transition-colors duration-300 transform  rounded-md sm:inline hover:bg-blue-950 hover:text-white`}
                    >
                        {btnNum}
                    </button>
                ))}

                <button
                    disabled={currentPage === numberOfPages}
                    onClick={() => handlePaginationBtn(currentPage + 1)}
                    className="px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-gray-200 rounded-md hover:bg-blue-950 disabled:hover:bg-gray-200 disabled:hover:text-gray-500 hover:text-white disabled:cursor-not-allowed disabled:text-gray-500"
                >
                    <div className="flex items-center -mx-1">
                        <span className="mx-1">Next</span>

                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-6 h-6 mx-1 rtl:-scale-x-100"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M17 8l4 4m0 0l-4 4m4-4H3"
                            />
                        </svg>
                    </div>
                </button>


            </div>

            <div className="text-center my-10">
                <form onSubmit={handleSearch} >

                    <input name='search' className='input input-bordered mr-3' placeholder='Search' type="text" />
                    <button>search</button>

                </form>
            </div>
            <div className="flex justify-between items-center my-10">
                <div>
                    <details className="dropdown mr-5">
                        <summary className="m-1 ">Date Added</summary>
                        <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-32">
                            <li onClick={() => { handleDescend('timestamp') }} ><a>Latest </a></li>
                            <li onClick={() => { handleAscend('timestamp') }} ><a>Oldest </a></li>
                        </ul>
                    </details>

                    <details className="dropdown">
                        <summary className="m-1 ">Price</summary>
                        <ul className="p-2 shadow menu dropdown-content z-[1]  bg-base-100 rounded-box md:w-32 w-20">
                            <li onClick={() => { handlepriceAscend('price') }} ><a>Low - High</a></li>
                            <li onClick={() => { handlepriceDescend('price') }} ><a>High - Low</a></li>
                        </ul>
                    </details>
                </div>
              <div className="space-x-5">
              <select name="brand" onChange={handleFilters} value={brandFilter} className="select select-info w-52 max-w-xs">
                    <option disabled selected>Select Brand</option>
                    <option value="" >All Brands</option>
                    <option value="Corsair">Corsair</option>
                    <option value="Noctua">Noctua</option>
                    <option value="Be quiet">be quiet!</option>
                    <option value="Thermaltake" >Thermaltake</option>
                    <option value="NZXT">NZXT</option>
                    <option value="Arctic">Arctic</option>
                    <option value="Fractal Design">Fractal Design</option>
                    <option value="Lian Li">Lian Li</option>
                    <option value="Phanteks">Phanteks</option>
                    <option value="SilverStone">SilverStone</option>
                    <option value="Deep Cool">Deep Cool</option>
                    <option value="Enermax">Enermax</option>
                    <option value="ID-COOLING">ID-COOLING</option>
                    <option value="Zalman">Zalman</option>
                    <option value="Vetroo">Vetroo</option>
                    <option value="Scythe">Scythe</option>
                
                </select>
                <select name="category" onChange={handleFilters} value={categoryFilter} className="select select-info w-52 max-w-xs">
                    <option disabled selected>Select Categories</option>
                    <option value="">ALL Categories</option>
                    <option value="Case Fan">Case Fan</option>
                    <option value="CPU Cooler Fan">CPU Cooler Fan</option>
                    <option value="RGB Fan">RGB Fan</option>
                    <option value="Silent Fan">Silent Fan</option>
                    <option value="High Airflow Fan">High Airflow Fan</option>
                    <option value="Radiator Fan">Radiator Fan</option>
                    <option value="Slim Fan">Slim Fan</option>
                    <option value="ARGB Fan">ARGB Fan</option>
                    <option value="LED Fan">LED Fan</option>
                </select>
                <select name="priceRange" onChange={handleFilters} value={priceRangefilter.join('-')} className="select select-info w-52 max-w-xs">
                        <option disabled selected>Select Price Range</option>
                        <option value="">All range</option>
                        <option value="1-10">1 - 100</option>
                        <option value="11-20">101 - 200</option>
                        <option value="21-30">201 - 300</option>
                        <option value="31-40">301 - 400</option>
                        <option value="41-50">401 - 500</option>
                        <option value="51-100">501 - 1000</option>
                    </select>

              </div>
            </div>
            <div className="grid md:grid-cols-4 grid-cols-1 gap-5">

                {
                    fans?.map((fan) =>
                        <div key={fan._id} className="border border-gray-600 text-center space-y-2 px-6 py-4 ">


                            <img src={fan.image} alt={fan.image} className="border " />
                            <h2 className="font-bold text-center">Brand: {fan.brand_name}</h2>
                            <h3 className="font-medium text-center"><span className="font-bold"> Model:</span> {fan.name}</h3>
                            <p className="text-center w-fit">{fan.description}</p>
                            <h4 className=" font-semibold ">PRICE: {fan.price}</h4>
                            <h5>{new Date(fan.timestamp).toLocaleString()}</h5>



                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default FeaturedFans;