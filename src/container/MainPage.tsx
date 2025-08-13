import TimerComponent from "@/components/TimerComponent"

function MainPage() {

    return (
        <>
            <div className='w-full flex flex-col justify-center text-center items-center gap-4'>
                <div className='font-bold'>
                    <h1>Welcome to Tomeiro Proyect</h1>
                </div>
                <img src="/tomeiro_favicon.png" alt="tomeiro logo" width={200} height={200} />
                <div className="">
                    <TimerComponent />
                </div>
            </div>
        </>
    )
}

export default MainPage