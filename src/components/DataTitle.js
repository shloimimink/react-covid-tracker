import moment from 'moment'

const DataTitle = ({title, dataDate}) => {
    const timestamp = moment(dataDate).format('MMMM Do YYYY, h:mm:ss a')

    return (
        <div className="text-center">
            <h2 className="text-3xl font-bold">{title}</h2>
            <div className="text-2xl mt-4 mb-10">
                {timestamp}
            </div>
        </div>
    );
};

export default DataTitle;