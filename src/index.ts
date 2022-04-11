import { IntroTS } from './Intro'
import { Hints } from './Hints'
import { introVuePlugin } from './plugin_vue'
// import './style.scss';

class Def {
  public intro() {
    return new IntroTS();
  }
  public hist() {
    return new Hints();
  }
  public vuePlugin() {
    return introVuePlugin;
  }
}
export default new Def()

export { IntroTS, Hints, introVuePlugin, Def }

// module.exports = { IntroTS, Hints, introVuePlugin, Def }
// module.exports.default = Def;
