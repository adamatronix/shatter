import './style.css'
import Shatter from './shatter';
import bgImage from './Hammer_bg.jpg';
import hammerImage from './Hammer6Noise 1.png';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <img src="${hammerImage}" alt="bg image" class="hammerimage" id="hammer"/>
  <div id="shatter" class="shatter">
  </div>
  <img src="${bgImage}" alt="bg image" class="bgimage"/>
`

new Shatter(document.querySelector<HTMLDivElement>('#shatter')!, document.querySelector<HTMLImageElement>('#hammer')!)
