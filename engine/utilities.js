/*
 * © MedioAI.com - Wynter Jones (@AI.MASSIVE)
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 */

const utilitiesMedioAI = {
  quill: null,

  getSettings: key => {
    return new Promise((resolve, reject) => {
      chrome.storage.local.get(['medioaiSettings'], function (result) {
        resolve(result.medioaiSettings[key])
      })
    })
  },

  setHotKeys: e => {
    if (e.key === 'Escape') {
      const songstudio = document.getElementById('medioAI-songstudio')
      songstudio.style.transform = 'translateX(-100%)'
      document.body.style.overflow = 'auto'
      songStudioMedioAI.isOpen = false
    }

    if ((e.ctrlKey && e.key === 'k') || (e.metaKey && e.key === 'k')) {
      document.querySelector('.lyric-tab-button[data-tab="write"]').click()
      const songstudio = document.getElementById('medioAI-songstudio')
      songstudio.style.transform = 'translateX(0)'
      document.body.style.overflow = 'hidden'
      songStudioMedioAI.isOpen = true
    }

    if ((e.ctrlKey && e.key === 'j') || (e.metaKey && e.key === 'j')) {
      document.querySelector('.lyric-tab-button[data-tab="build"]').click()
      const songstudio = document.getElementById('medioAI-songstudio')
      songstudio.style.transform = 'translateX(0)'
      document.body.style.overflow = 'hidden'
      songStudioMedioAI.isOpen = true
    }
  },

  uuidv4: () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = (Math.random() * 16) | 0,
        v = c == 'x' ? r : (r & 0x3) | 0x8
      return v.toString(16)
    })
  },

  formatDate: date => {
    date = new Date(date)
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour12: true,
    }

    let formatter = new Intl.DateTimeFormat('en-US', options)
    let formattedParts = formatter.formatToParts(date)

    let month, day, year, time
    for (let part of formattedParts) {
      switch (part.type) {
        case 'month':
          month = part.value
          break
        case 'day':
          day = part.value
          break
        case 'year':
          year = part.value
          break
        case 'hour':
        case 'minute':
        case 'dayPeriod':
          time = (time ? time : '') + part.value + (part.type === 'dayPeriod' ? '' : ':')
          break
      }
    }

    return `${time.trim()} on ${month} ${day}, ${year}`
  },

  randomStartingText: () => {
    return utilitiesMedioAI.placeholders[Math.floor(Math.random() * utilitiesMedioAI.placeholders.length)]
  },

  showNotification: (msg, type) => {
    if (document.querySelector('.medioaiNotice')) {
      document.querySelector('.medioaiNotice').remove()
    }

    const notification = document.createElement('div')
    notification.setAttribute(
      'class',
      'medioaiNotice fixed top-3 right-3 px-6 py-4 bg-gray-400 border rounded text-gray-300 text-white text-center'
    )

    let icon = `<svg style="color: #24CA8B" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 48 48"><defs><mask id="ipTSuccess0"><g fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="4"><path fill="#555" d="m24 4l5.253 3.832l6.503-.012l1.997 6.188l5.268 3.812L41 24l2.021 6.18l-5.268 3.812l-1.997 6.188l-6.503-.012L24 44l-5.253-3.832l-6.503.012l-1.997-6.188l-5.268-3.812L7 24l-2.021-6.18l5.268-3.812l1.997-6.188l6.503.012z"/><path d="m17 24l5 5l10-10"/></g></mask></defs><path fill="currentColor" d="M0 0h48v48H0z" mask="url(#ipTSuccess0)"/></svg>`
    if (type === 'error') {
      notification.setAttribute(
        'style',
        'z-index: 999999999999999999; background: #111; color: #fff; box-shadow: 0 0 20px #E3095D; border: 2px solid #E3095D;'
      )
      icon = `<svg style="color: #E3095D" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M12 4c-4.42 0-8 3.58-8 8s3.58 8 8 8s8-3.58 8-8s-3.58-8-8-8m1 13h-2v-2h2zm0-4h-2V7h2z" opacity="0.3"/><path fill="currentColor" d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2M12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8s8 3.58 8 8s-3.58 8-8 8m-1-5h2v2h-2zm0-8h2v6h-2z"/></svg>`
    } else {
      notification.setAttribute(
        'style',
        'z-index: 999999999999999999; background: #111; color: #fff; box-shadow: 0 0 20px #24CA8B; border: 2px solid #24CA8B;'
      )
    }

    notification.innerHTML = `<p class="flex space-x-2 items-center">${icon} <span>${msg}</span></p>`

    document.body.appendChild(notification)

    setTimeout(() => {
      notification.remove()
    }, 3000)
  },

  clearDB: () => {
    const keys = ['medioTags', 'medioLyrics', 'medioaiSettings', 'medioaiChats', 'medioaiSongChats']

    keys.forEach(key => {
      chrome.storage.local.get(key, data => {
        if (data[key]) {
          chrome.storage.local.remove(key, () => {})
        }
      })
    })
  },

  quill: () => {
    function insertText(quill, text) {
      const range = quill.getSelection()
      if (range) {
        const newText = `${text}\n`
        quill.insertText(range.index, newText)
        quill.setSelection(range.index + newText.length)
      }
    }
    const CustomDropdown = function (quill, options) {
      let toolbar = quill.getModule('toolbar')
      toolbar.addHandler('custom-dropdown', function (value) {
        if (value) {
          insertText(quill, value)
        }
      })
    }

    Quill.register('modules/customDropdown', CustomDropdown)

    utilitiesMedioAI.quill = new Quill('#editor', {
      theme: 'snow',
      scrollingContainer: '#medioai-content',
      placeholder: utilitiesMedioAI.randomStartingText(),
      modules: {
        toolbar: {
          container: '#toolbar',
          handlers: {
            'custom-dropdown': function (value) {
              insertText(this.quill, value)
            },
          },
        },
        customDropdown: true,
      },
    })

    function addCommandClass() {
      const editor = document.querySelector('#editor')
      const paragraphs = editor.querySelectorAll('p')
      paragraphs.forEach(p => {
        const trimmedText = p.textContent.trim()
        if (/^\[.*\]$/.test(trimmedText)) {
          p.classList.add('medioCommand')
        } else if (/^\/\/.*/.test(trimmedText)) {
          p.classList.add('medioComment')
        } else {
          p.classList.remove('medioCommand')
          p.classList.remove('medioComment')
        }
      })
    }

    utilitiesMedioAI.quill.on('text-change', function () {
      addCommandClass()

      const el = document.getElementById('medioCharactersSelected')
      el.style.display = 'none'

      setTimeout(() => {
        let editor = utilitiesMedioAI.quill.root
        let codeBlocks = editor.querySelectorAll('.ql-code-block')

        codeBlocks.forEach(codeBlock => {
          let text = codeBlock.textContent
          let p = document.createElement('p')
          p.textContent = text
          codeBlock.replaceWith(p)
        })
      }, 0)
    })

    utilitiesMedioAI.quill.on('selection-change', function (range, oldRange, source) {
      const el = document.getElementById('medioCharactersSelected')
      if (range) {
        if (el && range.length == 0) {
          el.style.display = 'none'
        } else {
          const text = utilitiesMedioAI.quill.getText(range.index, range.length)
          const charCount = text.length
          let className = 'text-white font-bold'
          if (charCount > 350) {
            className = 'text-red-500 font-bold'
          }
          el.style.display = 'inline-block'
          el.innerHTML =
            "<strong class='" +
            className +
            "'>" +
            charCount +
            '</strong> characters with <strong class="text-white">' +
            utilitiesMedioAI.countSyllablesInText(text) +
            '</strong> syllables selected.'
        }
      } else if (el) {
        el.style.display = 'none'
      }
    })

    document.querySelector('.ql-custom-dropdown').addEventListener('change', function () {
      let value = this.value
      quill.getModule('toolbar').handlers['custom-dropdown'].call(quill, value)
    })

    utilitiesMedioAI.quill.clipboard.addMatcher(Node.ELEMENT_NODE, (node, delta) => {
      let ops = []

      delta.ops.forEach(op => {
        if (op.insert && typeof op.insert === 'string') {
          ops.push({
            insert: op.insert,
          })
        }
      })

      delta.ops = ops

      let length = utilitiesMedioAI.quill.getLength()
      let range = { index: 0, length: length }
      if (range.length > 0) {
        utilitiesMedioAI.quill.removeFormat(range, Quill.sources.USER)
      }

      return delta
    })
  },

  countSyllablesInText(text) {
    // Function to count syllables in a single word
    function countSyllables(word) {
      word = word.toLowerCase() // Convert word to lowercase
      if (word.length <= 3) {
        return 1
      } // Treat short words as one syllable

      // Regex to match vowel groups (a, e, i, o, u, y)
      const vowelGroups = word.match(/[aeiouy]+/g)

      // Count vowel groups
      let syllableCount = vowelGroups ? vowelGroups.length : 0

      // Subtract one syllable for each silent 'e' at the end
      if (word.endsWith('e')) {
        syllableCount--
      }

      // Ensure there's at least one syllable
      syllableCount = Math.max(syllableCount, 1)

      return syllableCount
    }

    // Remove text inside square brackets
    text = text.replace(/\[.*?\]/g, '')

    // Split text into words using spaces and punctuation as delimiters
    const words = text.match(/\b(\w+)\b/g)

    // Count syllables for each word and sum them up
    let totalSyllables = 0
    if (words) {
      words.forEach(word => {
        totalSyllables += countSyllables(word)
      })
    }

    return totalSyllables
  },

  formatBytes: (bytes, decimals = 2) => {
    if (bytes === 0) return '0 Bytes'
    bytes = parseInt(bytes)

    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
  },

  populateSelect: async (jsonUrl, elementId, placeholder, settingsData) => {
    const database = await utilitiesMedioAI.getSettings(settingsData.key)
    if (database) {
      return utilitiesMedioAI.buildSelectBoxes(JSON.parse(database), elementId, placeholder)
    } else {
      return fetch(jsonUrl)
        .then(response => response.json())
        .then(data => {
          utilitiesMedioAI.buildSelectBoxes(data, elementId, placeholder)
        })
    }
  },

  buildSelectBoxes: (data, elementId, placeholder) => {
    const select = document.getElementById(elementId)
    if (!select) return
    const option = document.createElement('option')
    option.value = ''
    option.textContent = placeholder
    option.disabled = true
    option.selected = true
    select.appendChild(option)
    data.forEach(item => {
      let value = item
      let text = item
      if (item.value) {
        value = item.value
        text = item.text
      }
      const option = document.createElement('option')
      option.value = value
      option.textContent = text
      select.appendChild(option)
    })
  },

  placeholders: [
    'Compose an epic song here...',
    'Write a love song...',
    'Pen your next hit single...',
    'Create a catchy chorus...',
    'Start your ballad here...',
    'Write lyrics from the heart...',
    'Craft a song about summer...',
    'Compose a tune for rainy days...',
    'Write a song about adventure...',
    'Create a melody about friendship...',
    'Compose a song about dreams...',
    'Write a song about overcoming obstacles...',
    'Start your song about a journey...',
    'Create a love anthem...',
    'Pen a song about heartbreak...',
    'Compose a lullaby...',
    'Write an empowering song...',
    'Create a festive holiday song...',
    'Compose a song about nostalgia...',
    'Write lyrics about nature...',
    'Start your soulful tune here...',
    'Compose a song for a special occasion...',
    'Write a song inspired by the night sky...',
    'Create a dance track...',
    'Pen a song about new beginnings...',
    'Compose a tune about city life...',
    'Write a song about peace...',
    'Create a whimsical song...',
    'Compose a song about hope...',
    'Write a song about the ocean...',
  ],
}
