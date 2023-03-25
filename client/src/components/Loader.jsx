import { prettyFilesize } from '../utils';
import './Loader.css';

export default function Loader({progress}) {
    console.log({progress});
    const ddragonSizeText = progress.ddragonSize > 0 ? prettyFilesize(progress.ddragonSize) : 'unknown size';
    const matchesSizeText = progress.matchesSize > 0 ? prettyFilesize(progress.matchesSize) : 'unknown size';

    return <div>
        <Spinner></Spinner>
        <Stepper>
            <Step done={!!progress.ddragonLoaded} size={progress.ddragonSize}>Load DDragon data ({ddragonSizeText})</Step>
            <Step done={!!progress.matchesLoaded} size={progress.matchesSize}>Load matches data ({matchesSizeText})</Step>
            <Step>Preprocess matches</Step>
        </Stepper>
    </div>
}

/**
 * Placeholder spinner.
 * Stolen from https://codepen.io/jpanter/pen/PWWQXK
 */
function Spinner() {
    return    <div className="dank-ass-loader">
    <div className="row">
       <div className="arrow up outer outer-18"></div>
       <div className="arrow down outer outer-17"></div>
       <div className="arrow up outer outer-16"></div>
       <div className="arrow down outer outer-15"></div>
       <div className="arrow up outer outer-14"></div>
    </div>
    <div className="row">
       <div className="arrow up outer outer-1"></div>
       <div className="arrow down outer outer-2"></div>
       <div className="arrow up inner inner-6"></div>
       <div className="arrow down inner inner-5"></div>
       <div className="arrow up inner inner-4"></div>
       <div className="arrow down outer outer-13"></div>
       <div className="arrow up outer outer-12"></div>
    </div>
    <div className="row">
       <div className="arrow down outer outer-3"></div>
       <div className="arrow up outer outer-4"></div>
       <div className="arrow down inner inner-1"></div>
       <div className="arrow up inner inner-2"></div>
       <div className="arrow down inner inner-3"></div>
       <div className="arrow up outer outer-11"></div>
       <div className="arrow down outer outer-10"></div>
    </div>
    <div className="row">
       <div className="arrow down outer outer-5"></div>
       <div className="arrow up outer outer-6"></div>
       <div className="arrow down outer outer-7"></div>
       <div className="arrow up outer outer-8"></div>
       <div className="arrow down outer outer-9"></div>
    </div>
 </div>
}

function Stepper({children}) {
    return <ol className="stepper">
        {children}
    </ol>
}

/**
 * A la Helios.
 * - Should have status, label, and description (secondary label)
 * @param {*} props
 */
function Step({children, done = false}) {
    return <li className="stepper__step" data-done={done}>{children}</li>
}
