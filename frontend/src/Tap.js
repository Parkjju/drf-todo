function Tap({ viewCompleted, handleViewCompleted }) {
    return (
        <div className='nav nav-tabs'>
            <span
                className={viewCompleted ? 'nav-link active' : 'nav-link'}
                onClick={() => handleViewCompleted(true)}
            >
                Complete
            </span>
            <span
                className={viewCompleted ? 'nav-link' : 'nav-link active'}
                onClick={() => handleViewCompleted(false)}
            >
                Incomplete
            </span>
        </div>
    );
}

export default Tap;
