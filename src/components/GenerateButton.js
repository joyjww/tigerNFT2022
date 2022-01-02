import propTypes from 'prop-types';

function GenerateButton({reverseBack, onClick, toggleshow}) {

    return (
        <div>{
            toggleshow ? 
            <button className='generatebtn' onClick={reverseBack}>Back</button> : 
            <button className='generatebtn' onClick={onClick}>Generate</button>
            }   
        </div>
    )
}

GenerateButton.propTypes = {
    onClick: propTypes.func.isRequired,
    toggleshow: propTypes.bool,
    reverseBack: propTypes.func.isRequired
}

export default GenerateButton

