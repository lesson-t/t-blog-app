import $ from 'jquery'
import axios from 'modules/axios'
import {
    listenInactiveHeartEvent,
    listenactiveHeartEvent
} from 'modules/handle_heart'

const handleHeartDisplay = (hasLiked) => {
    if (hasLiked) {
        $('.active-heart').removeClass('hidden')
    } else {
        $('.inactive-heart').removeClass('hidden')
    }
}

const handleCommentForm = () => {
    $('.show-comment-form').on('click', () => {
        $('.show-comment-form').addClass('hidden')
        $('.comment-text-area').removeClass('hidden')
    })
}

const appendNewComment = (comment) => {
    $('.comments-container').append(
        `<div class="atricle_comment"><p>${escape(comment.content)}</p></div>`
    ) 
}

document.addEventListener('turbolinks:load', () => {
    const dataset = $('#article-show').data()
    const articleId = dataset.articleId

    axios.get(`/api/articles/${articleId}/comments`)
    .then((response) => {
        const comments = response.data
        comments.forEach((comment) => {
            appendNewComment(comment)
        });
    })

    handleCommentForm()

    $('.add-comment-btn').on('click', () => {
        const content = $('#comment_content').val()
        if (!content) {
            window.alert('コメントを入力してください')
        } else {
            axios.post(`/api/articles/${articleId}/comments`, {
                comment: {content: content}
            })
                .then((res) => {
                    const comment = res.data
                    appendNewComment(comment)
                    $('#comment_content').val('')
                })
        }
    })

    axios.get(`/api/articles/${articleId}/like`)
        .then((response) => {
            const hasLiked = response.data.hasLiked
            handleHeartDisplay(hasLiked)
    })

    listenInactiveHeartEvent(articleId)
    listenactiveHeartEvent(articleId)
})