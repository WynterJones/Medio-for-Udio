/*
 * Icons from Iconify.com
 * © MedioAI.com - Wynter Jones (@AI.MASSIVE)
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 */

const paginationMedioAI = {
  chatHistory: [],
  perPage: 2,

  init: (key, id, callback) => {
    chrome.storage.local.get([key], result => {
      const items = result[key] || []
      const container = document.getElementById(id)
      const header = document.createElement('div')
      const wrapper = document.createElement('div')

      header.innerHTML = paginationMedioAI.header(items.length)
      container.innerHTML = ''
      container.append(header)
      wrapper.classList.add('medioListContainer')
      paginationMedioAI.chatHistory = items

      const currentPortion = items.slice(0, paginationMedioAI.perPage)
      const totalPages = Math.ceil(items.length / paginationMedioAI.perPage)

      document.querySelector('#medioPageCount').innerText = '1 of ' + totalPages + ' Pages'
      document.querySelector('#medioPageCount').setAttribute('data-max', totalPages)
      document.querySelector('#medioPageCount').setAttribute('data-current', 1)

      currentPortion.reverse().forEach(chat => {
        const newChat = document.createElement('div')
        newChat.setAttribute('data-id', chat.id)
        newChat.innerHTML = paginationMedioAI.block(chat)
        wrapper.append(newChat)
      })

      container.append(wrapper)
      paginationMedioAI.events(callback, items, wrapper, totalPages)
    })
  },

  events: (callback, items, wrapper, totalPages) => {
    const searchBox = document.querySelector('#medioSearchChatList')
    searchBox.addEventListener('input', e => {
      paginationMedioAI.search(e.target.value, wrapper)
    })

    const medioPrev = document.getElementById('medioPrev')
    medioPrev.addEventListener('click', async e => {
      paginationMedioAI.previous(e, wrapper, totalPages)
    })

    const medioNext = document.getElementById('medioNext')
    medioNext.addEventListener('click', async e => {
      paginationMedioAI.next(e, wrapper, totalPages)
    })

    const chatItemView = document.querySelectorAll('.medioChatItemView')
    chatItemView.forEach(item => {
      item.addEventListener('click', async e => {
        const id = e.target.getAttribute('data-id')
        const item = items.find(item => item.id === id)
        callback(item)
      })
    })
  },

  search: (value, wrapper) => {
    const search = value.toLowerCase()
    const chats = paginationMedioAI.chatHistory

    if (search === '') {
      wrapper.innerHTML = ''
      const firstChats = chats.slice(0, paginationMedioAI.perPage)
      firstChats.reverse().forEach(chat => {
        const newChat = document.createElement('div')
        newChat.setAttribute('data-id', chat.id)
        newChat.innerHTML = paginationMedioAI.block(chat)
        wrapper.append(newChat)
      })

      document.querySelector('#medioPageCount').setAttribute('data-current', '1')
      document.querySelector('#medioPageCount').setAttribute('data-max', chats.length)
      document.querySelector('#medioPageCount').innerHTML = `Page 1 of ${chats.length}`
      document.querySelector('#medioPrev').classList.add('medioDisabled')
      document.querySelector('#medioNext').classList.remove('medioDisabled')
      return
    }

    const filteredChats = chats.filter(chat => {
      if (chat.name) {
        return chat.name.toLowerCase().includes(search) || chat.song_title.toLowerCase().includes(search)
      } else {
        return chat.song_title.toLowerCase().includes(search)
      }
    })

    wrapper.innerHTML = ''

    filteredChats.reverse().forEach(chat => {
      const newChat = document.createElement('div')
      newChat.setAttribute('data-id', chat.id)
      newChat.innerHTML = paginationMedioAI.block(chat)
      wrapper.append(newChat)
    })

    document.querySelector('#medioPageCount').innerHTML = '1 of 1 Pages'
    document.querySelector('#medioPrev').classList.add('medioDisabled')
    document.querySelector('#medioNext').classList.add('medioDisabled')
  },

  previous: (e, wrapper, totalPages) => {
    const current = parseInt(document.querySelector('#medioPageCount').getAttribute('data-current')) - 1

    if (current < 1) {
      document.querySelector('#medioPrev').classList.add('medioDisabled')
      return
    } else {
      document.querySelector('#medioPageCount').setAttribute('data-current', current)
      const chats = paginationMedioAI.chatHistory
      const currentPortion = chats.slice(
        current * paginationMedioAI.perPage - paginationMedioAI.perPage,
        current * paginationMedioAI.perPage
      )
      document.querySelector('#medioPrev').classList.remove('medioDisabled')
      wrapper.innerHTML = ''
      currentPortion.reverse().forEach(chat => {
        const newChat = document.createElement('div')
        newChat.setAttribute('data-id', chat.id)
        newChat.innerHTML = paginationMedioAI.block(chat)
        wrapper.append(newChat)
      })

      document.querySelector('#medioPageCount').innerText = current + ' of ' + totalPages + ' Pages'

      if (parseInt(current) === 1) {
        document.querySelector('#medioPrev').classList.add('medioDisabled')
      }
      if (parseInt(current) !== parseInt(totalPages)) {
        document.querySelector('#medioNext').classList.remove('medioDisabled')
      }
    }
  },

  next: (e, container, totalPages) => {
    const current = parseInt(document.querySelector('#medioPageCount').getAttribute('data-current')) + 1
    const max = parseInt(document.querySelector('#medioPageCount').getAttribute('data-max'))

    if (current > max) {
      e.target.classList.add('medioDisabled')
      return
    } else {
      if (current === max) {
        e.target.classList.add('medioDisabled')
      }
      document.querySelector('#medioPageCount').setAttribute('data-current', current)
      const chats = paginationMedioAI.chatHistory
      const currentPortion = chats.slice(
        (current - 1) * paginationMedioAI.perPage,
        (current - 1) * paginationMedioAI.perPage + paginationMedioAI.perPage
      )
      document.querySelector('#medioPrev').classList.remove('medioDisabled')
      container.innerHTML = ''
      currentPortion.reverse().forEach(chat => {
        const newChat = document.createElement('div')
        newChat.setAttribute('data-id', chat.id)
        newChat.innerHTML = paginationMedioAI.block(chat)
        container.append(newChat)
      })

      document.querySelector('#medioPageCount').innerText = current + ' of ' + totalPages + ' Pages'
    }
  },

  header: length => {
    return /* html */ `<div class="flex items-center space-x-2 justify-between mb-2">
          <input id="medioSearchChatList" type="text" autocomplete="off" placeholder="Search..." class="w-full rounded border p-1 px-2" />
          <div id="medioPagination" class="flex items-center" style="width: 400px">
            <button id="medioPrev" class="medioDisabled">Previous</button>
            <div data-current="1" data-max="${length}" id="medioPageCount" class="w-full">
              Page 1 of ${length}
            </div>
            <button id="medioNext">Next</button>
          </div>
        </div>`
  },

  block: chat => {
    return /* html */ `<div class="medioChatItem mb-2 flex items-center justify-between p-2 border rounded">
      <div>
        <h4 class="text-lg font-bold">${chat.name}</h4>
        <p class="text-sm flex space-x-4 text-gray-400">
        <span>${new Date(chat.created_at).toLocaleString()}</span> 
        <span style="opacity: 0.5">${chat.song_title}</span></p>
      </div>
      <button class="medioChatDelete" data-id="${chat.id}">
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256"><path fill="currentColor" d="M216 48h-36V36a28 28 0 0 0-28-28h-48a28 28 0 0 0-28 28v12H40a12 12 0 0 0 0 24h4v136a20 20 0 0 0 20 20h128a20 20 0 0 0 20-20V72h4a12 12 0 0 0 0-24M100 36a4 4 0 0 1 4-4h48a4 4 0 0 1 4 4v12h-56Zm88 168H68V72h120Zm-72-100v64a12 12 0 0 1-24 0v-64a12 12 0 0 1 24 0m48 0v64a12 12 0 0 1-24 0v-64a12 12 0 0 1 24 0"></path></svg>
      </button>
    </div>`
  },
}