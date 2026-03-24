import { motion, AnimatePresence } from 'framer-motion'
import { useSnapshot } from 'valtio'

import state from '../store'
import {
  slideAnimation,
  headTextAnimation,
  headContentAnimation,
  headContainerAnimation
} from '../config/motion'
import { CustomButton } from '../components'


const Home = () => {
  const snap = useSnapshot(state)

  return (
    <AnimatePresence>
      {
        snap.isHomePage && (
          <motion.section className='home' {...slideAnimation('left')}>
            <motion.header {...slideAnimation('down')}>
              <img src='./threejs.png' alt='logo' className='w-10 h-10 object-contain'/>
            </motion.header>
            <motion.div className='home-content' {...headContainerAnimation}>
              <motion.div {...headTextAnimation}>
                <h1 className='head-text'>Unleash <br className='xl:block hidden'/>Your Style <br className='xl:block hidden'/>Stand Out!</h1>
              </motion.div>
              <motion.div {...headContentAnimation} className='flex flex-col gap-5'>
                <p className='max-w-md font-normal text-gray-600 text-base' >
                Step into the future of fashion with our 3D custom t-shirt designer powered by Three.js. 
                Explore, customize, and visualize your unique creations in stunning detail. 
                <strong>{' '}Express your style like never before!</strong>
                </p>
                
                <CustomButton 
                type='filled' 
                title='Customize your shirt!' 
                handleClick={()=>state.isHomePage = false} 
                customStyles='w-fit px-4 py-2.5 font-bold text-sm'
                />
              </motion.div>
            </motion.div>
          </motion.section>
        )
      }
    </AnimatePresence>
  )
}

export default Home
