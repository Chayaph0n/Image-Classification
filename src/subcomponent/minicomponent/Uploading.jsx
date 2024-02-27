

const Uploading = ({ files, icon }) => {

    return (
        <>
            <section>
                {files.map((file, index) => (
                    <li className="h-14 mb-1 flex items-center justify-between bg-dark px-6 py-3 rounded-xl text-white" key={index}>
                        <div className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-purple text-4xl">{icon}</span>
                            <div className="w-3/4 text-sm">{`${file.name}`}</div>
                        </div>
                        <div className="flex items-center w-60 gap-2">
                            <div className="mt-0.5 text-sm">{`${file.loading}%`}</div>
                            <div className='w-full h-2 bg-graycustom rounded-xl'>
                                <div style={{ width: `${file.loading}%` }} className={'h-2 bg-blue rounded-xl'}></div>
                            </div>
                        </div>
                    </li>
                ))}
            </section>
        </>
    )
}

export default Uploading;