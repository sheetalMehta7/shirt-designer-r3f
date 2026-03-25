import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useSnapshot } from 'valtio'
import config from '../config/config'
import state from '../store'
import { downloadCanvasToImage, reader } from '../config/helpers'
import { EditorTabs, FilterTabs, DecalTypes } from '../config/constants'
import { fadeAnimation, slideAnimation } from '../config/motion'
import { AIPicker, ColorPicker, FilePicker, CustomButton, Tab } from '../components'

const TAB_LABELS = {
  colorpicker: 'Color',
  filepicker: 'Upload',
  aipicker: 'AI Art',
}

const Customizer = () => {
  const snap = useSnapshot(state)
  const [file, setFile] = useState('')
  const [prompt, setPrompt] = useState('')
  const [generatingImg, setGeneratingImg] = useState(false)
  const [activeEditorTab, setActiveEditorTab] = useState('')
  const [activeFilterTab, setActiveFilterTab] = useState({
    logoShirt: true,
    stylishShirt: false,
  })

  const handleDecal = (type, res) => {
    const decaltype = DecalTypes[type]
    state[decaltype.stateProperty] = res
    if (!activeFilterTab[decaltype.filterTab]) {
      handleActiveFilterTab(decaltype.filterTab)
    }
  }

  const handleActiveFilterTab = (tabName) => {
    switch (tabName) {
      case 'logoShirt':
        state.isLogoTexture = !activeFilterTab[tabName]
        break
      case 'stylishShirt':
        state.isFullTexture = !activeFilterTab[tabName]
        break
      default:
        state.isLogoTexture = true
        state.isFullTexture = false
    }
    setActiveFilterTab((prev) => ({ ...prev, [tabName]: !prev[tabName] }))
  }

  const readFile = (type) => {
    reader(file).then((res) => {
      handleDecal(type, res)
      setActiveEditorTab('')
    })
  }

  const handleSubmit = async (type) => {
    if (!prompt) return alert('Please enter a prompt.')
    try {
      setGeneratingImg(true)
      const response = await fetch(config.development.backendUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      })
      const data = await response.json()
      if (response.status === 200) {
        handleDecal(type, `data:image/png;base64,${data.photo}`)
      } else {
        throw new Error('Something went wrong')
      }
    } catch (error) {
      alert(error)
    } finally {
      setGeneratingImg(false)
      setActiveEditorTab('')
    }
  }

  const generateTabContent = () => {
    switch (activeEditorTab) {
      case 'colorpicker':
        return <ColorPicker />
      case 'filepicker':
        return <FilePicker file={file} setFile={setFile} readFile={readFile} />
      case 'aipicker':
        return (
          <AIPicker
            prompt={prompt}
            setPrompt={setPrompt}
            generatingImg={generatingImg}
            handleSubmit={handleSubmit}
          />
        )
      default:
        return null
    }
  }

  return (
    <AnimatePresence>
      {!snap.isHomePage && (
        <>
          {/* ── Left editor panel ── */}
          <motion.div
            key='custom'
            className='absolute top-0 left-0 z-10'
            {...slideAnimation('left')}
          >
            <div className='flex items-center min-h-screen'>
              <div className='editortabs-container'>
                <p className='editor-section-label'>Customize</p>

                {EditorTabs.map((tab) => (
                  <div key={tab.name} className='tab-wrapper'>
                    <Tab
                      tab={tab}
                      handleClick={() =>
                        setActiveEditorTab((prev) => (prev === tab.name ? '' : tab.name))
                      }
                    />
                    <span className='tab-tooltip'>{TAB_LABELS[tab.name]}</span>
                  </div>
                ))}

                {generateTabContent()}
              </div>
            </div>
          </motion.div>

          {/* ── Top-right controls ── */}
          <motion.div
            className='absolute z-10 top-5 right-5 flex flex-col gap-2 items-end'
            {...fadeAnimation}
          >
            <CustomButton
              type='filled'
              title='← Go Back'
              handleClick={() => (state.isHomePage = true)}
              customStyles='w-fit px-4 py-2.5 font-bold text-sm'
            />
            <button className='download-btn' onClick={downloadCanvasToImage}>
              ⬇ Download PNG
            </button>
          </motion.div>

          {/* ── Bottom filter tabs — centered pill ── */}
          <motion.div className='filtertabs-container' {...slideAnimation('up')}>
            <div className='filtertabs-inner'>
              <span className='filter-label'>Placement</span>
              {FilterTabs.map((tab) => (
                <Tab
                  key={tab.name}
                  tab={tab}
                  isFilterTab
                  isActiveTab={activeFilterTab[tab.name]}
                  handleClick={() => handleActiveFilterTab(tab.name)}
                />
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default Customizer
