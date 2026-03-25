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
      {snap.isHomePage && (
        <motion.section className='home' {...slideAnimation('left')}>
          <motion.header {...slideAnimation('down')}>
            <img src='./threejs.png' alt='logo' className='w-10 h-10 object-contain' />
          </motion.header>

          <motion.div className='home-content' {...headContainerAnimation}>
            <motion.div {...headTextAnimation}>
              <h1 className='head-text'>
                Design.<br className='xl:block hidden' />
                Wear.<br className='xl:block hidden' />
                <span style={{ opacity: 0.6 }}>Repeat.</span>
              </h1>
            </motion.div>

            <motion.div {...headContentAnimation} className='flex flex-col gap-5'>
              <p className='max-w-md font-normal text-gray-600 text-base'>
                Create your perfect t-shirt in real time — pick colors, upload artwork,
                or let <strong>AI generate a design</strong> just for you.
                See every detail on an interactive 3D model before you wear it.
              </p>

              {/* Feature pills */}
              <div className='flex flex-wrap gap-2'>
                {[
                  '🎨 Custom Colors',
                  '🖼️ Upload Artwork',
                  '✨ AI-Generated Designs',
                  '📐 3D Preview',
                ].map((f) => (
                  <span
                    key={f}
                    className='text-xs font-medium px-3 py-1 rounded-full border border-gray-300 text-gray-600 bg-white bg-opacity-60'
                  >
                    {f}
                  </span>
                ))}
              </div>

              <div className='flex flex-wrap items-center gap-3 mt-1'>
                <CustomButton
                  type='filled'
                  title='Start Designing →'
                  handleClick={() => state.isHomePage = false}
                  customStyles='w-fit px-5 py-2.5 font-bold text-sm'
                />
                <span className='text-xs text-gray-400'>No account needed · Free to try</span>
              </div>
            </motion.div>
          </motion.div>
        </motion.section>
      )}
    </AnimatePresence>
  )
}

export default Home
