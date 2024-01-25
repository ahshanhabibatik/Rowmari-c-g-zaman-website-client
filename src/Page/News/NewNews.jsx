

const NewNews = ({ newNews }) => {

    const { sl, Date, Headline, Description, View } = newNews;
    return (
        <div className="border-2 mx-16">

           
            <tr className="">
                <td className="w-7"  >{sl}</td>
                <td className="w-20" >{Date}</td>
                <td className="w-72">{Headline}</td>
                <td className="w-[700px]" >{Description}</td>
                <td  >{View}</td>
            </tr>



        </div>
    );
};

export default NewNews;