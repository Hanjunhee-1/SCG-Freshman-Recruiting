// CommonJS 식 import 방식
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

// 날짜 추가할때 사용. 혹은 수정할때 사용.
const dateFormat = require('./dateFormat');
const port = 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

let Board = [
    {
        title: 'HTML',
        content: 'html 은 Hyper Text Markup Language 의 약자로 웹 페이지를 제작하기 위한 언어입니다.',
        createdAt: '2023-02-01',
        updatedAt: '2023-02-02',
    },
    {
        title: 'CSS',
        content: 'CSS 는 Cascading Style Sheets 의 약자로 HTML 파일을 꾸며주기 위한 언어입니다.',
        createdAt: '2023-02-10',
        updatedAt: '2023-02-14',
    },
    {
        title: 'JavaScript',
        content: 'JavaScript 는 보통 JS 라고 줄여서 부르기도 합니다. HTML, CSS 를 제어할 수 있습니다.',
        createdAt: '2023-02-18',
        updatedAt: '2023-02-18',
    },
];

app.get('/', (req, res) => {
    res.redirect(`http://localhost:${port}/stacks`);
})

app.get('/stacks', (req, res) => {
    var titleQuery = req.query.title;
    var boardList = '';
    var boardCount = 0;
    var output;
    if (titleQuery && isNaN(titleQuery)) {
        for (var obj of Board) {
            if (obj.title.includes(titleQuery)) {
                const title = obj.title;
                let content = obj.content;
                const createdAt = obj.createdAt;
                const updatedAt = obj.updatedAt;
                if (obj.content.length > 10) {
                    content = obj.content.substring(0, 10) + '...';
                }
                boardList += `
                    <tr>
                        <td>${Board.indexOf(obj)}</td>
                        <td>${title}</td>
                        <td>${content}</td>
                        <td>${createdAt}</td>
                        <td>${updatedAt}</td>
                    </tr>
                `
                boardCount++;
            }
        }
        output = `<!DOCTYPE html>
        <html lang="ko">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="stylesheet" href="/css/style.css">
            <title>My Stacks</title>
        </head>
        <body>
            <div id="container">
                <a href="http://localhost:3000">
                    <h1 id="title">내가 다룰 수 있는 기술 스택 자랑하기</h1>
                </a>
                <div id="search-container">
                    <form action="http://localhost:3000/stacks" method="get">
                        <input id="search-keyword" type="text" name="title" placeholder="입력하신 단어를 포함하는 제목의 게시글을 볼 수 있습니다">
                        <input id="search-button" type="submit" value="검색">
                    </form>
                </div>
                <div id="search-container">
                    <form id="find-by-id" method="post">
                        <input id="search-id" type="text" name="id" placeholder="번호를 입력하여 게시글을 자세히 볼 수 있습니다">
                        <input id="search-button" type="submit" value="상세보기" onclick="submitForm()">
                    </form>
                </div>
                <div id="write">
                    <a id="write-button" href="http://localhost:3000/stacks/write">새 게시글 작성하기</a>
                </div>
                <div id="bodrds-count">
                    <p id="notice">현재 검색된 게시글 개수: <span id="count">${boardCount}</span></p>
                </div>
                <div id="boards">
                    <table id="boards-list">
                        <tr id="boards-row">
                            <th>번호</th>
                            <th>제목</th>
                            <th>내용</th>
                            <th>작성일</th>
                            <th>수정일</th>
                        </tr>
                        ${boardList}
                    </table>
                </div>
            </div>
            <script src="/js/submitForm.js"></script>
        </body>
        </html>`
    } else {
        for (var obj of Board) {
            const title = obj.title;
            let content = obj.content;
            const createdAt = obj.createdAt;
            const updatedAt = obj.updatedAt;
            if (obj.content.length > 10) {
                content = obj.content.substring(0, 10) + '...';
            }
            boardList += `
                <tr>
                    <td>${Board.indexOf(obj)}</td>
                    <td>${title}</td>
                    <td>${content}</td>
                    <td>${createdAt}</td>
                    <td>${updatedAt}</td>
                </tr>
            `
            boardCount++;
        }
        output = `<!DOCTYPE html>
        <html lang="ko">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="stylesheet" href="/css/style.css">
            <title>My Stacks</title>
        </head>
        <body>
            <div id="container">
                <a href="http://localhost:3000">
                    <h1 id="title">내가 다룰 수 있는 기술 스택 자랑하기</h1>
                </a>
                <div id="search-container">
                    <form action="http://localhost:3000/stacks" method="get">
                        <input id="search-keyword" type="text" name="title" placeholder="입력하신 단어를 포함하는 제목의 게시글을 볼 수 있습니다">
                        <input id="search-button" type="submit" value="검색">
                    </form>
                </div>
                <div id="search-container">
                    <form id="find-by-id" method="post">
                        <input id="search-id" type="text" name="id" placeholder="번호를 입력하여 게시글을 자세히 볼 수 있습니다">
                        <input id="search-button" type="submit" value="상세보기" onclick="submitForm()">
                    </form>
                </div>
                <div id="write">
                    <a id="write-button" href="http://localhost:3000/stacks/write">새 게시글 작성하기</a>
                </div>
                <div id="bodrds-count">
                    <p id="notice">현재 검색된 게시글 개수: <span id="count">${boardCount}</span></p>
                </div>
                <div id="boards">
                    <table id="boards-list">
                        <tr id="boards-row">
                            <th>번호</th>
                            <th>제목</th>
                            <th>내용</th>
                            <th>작성일</th>
                            <th>수정일</th>
                        </tr>
                        ${boardList}
                    </table>
                </div>
            </div>
            <script src="/js/submitForm.js"></script>
        </body>
        </html>`
    }

    res.send(output);
})

app.post('/stacks/:id', (req, res) => {
    const id = req.body.id;
    var board = '';
    var output = '';
    // 파라미터가 숫자가 아닐 경우
    if (isNaN(id)) {
        output = `
            <h1>${id} 는 유효한 숫자 값이 아닙니다.</h1>
        `
        res.send(output);
        return;
    } else {
        for(var obj of Board) {
            if (Board.indexOf(obj) == id) {
                board = obj;
            }
        }
        if (!board) {
            output = `
                <h1>해당 id 를 가지는 게시글이 없습니다</h1>
            `
            res.send(output);
            return;
        }
        output = `<!DOCTYPE html>
        <html lang="ko">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="stylesheet" href="/css/style.css">
            <title>My Stacks</title>
        </head>
        <body>
            <div id="container">
                <a href="http://localhost:3000">
                    <h1 id="title">내가 다룰 수 있는 기술 스택 자랑하기</h1>
                </a>
                <div id="search-container">
                    <form action="http://localhost:3000/stacks" method="get">
                        <input id="search-keyword" type="text" name="title" placeholder="입력하신 단어를 포함하는 제목의 게시글을 볼 수 있습니다">
                        <input id="search-button" type="submit" value="검색">
                    </form>
                </div>
                <div id="search-container">
                    <form id="find-by-id" method="post">
                        <input id="search-id" type="text" name="id" placeholder="번호를 입력하여 게시글을 자세히 볼 수 있습니다">
                        <input id="search-button" type="submit" value="상세보기" onclick="submitForm()">
                    </form>
                </div>
                <div id="board-detail-view">
                    <div id="title-and-dates">
                        <p class="board-title">
                            ${board.title}
                        </p>
                        <div id="dates">
                            <p class="createdAt">
                                작성일: ${board.createdAt}
                            </p>
                            <p class="updatedAt">
                                수정일: ${board.updatedAt}
                            </p>
                        </div>
                    </div>
                    <div id="board-content">
                        <p class="content">
                            ${board.content}
                        </p>
                    </div>
                    <div id="edit-button">
                        <a href="http://localhost:3000/stacks/${Board.indexOf(board)}/edit">수정하기</a>
                    </div>
                </div>
            </div>
            <script src="/js/submitForm.js"></script>
        </body>
        </html>`
        res.send(output);
    }
})

app.get('/stacks/:id/edit', (req, res) => {
    const { id } = req.params;
    var board = '';
    var output = '';

    if (isNaN(id)) {
        output = `
            <h1>${id} 는 유효한 숫자 값이 아닙니다.</h1>
        `
        res.send(output);
        return;
    }

    for(var obj of Board) {
        if (Board.indexOf(obj) == id) {
            board = obj;
        }
    }

    if (!board) {
        output = `
            <h1>해당 id 를 가지는 게시글이 없습니다</h1>
        `
        res.send(output);
        return;
    }

    output = `<!DOCTYPE html>
    <html lang="ko">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="/css/style.css">
        <title>My Stacks</title>
    </head>
    <body>
        <div id="container">
            <a href="http://localhost:3000">
                <h1 id="title">내가 다룰 수 있는 기술 스택 자랑하기</h1>
            </a>
            <div id="edit-board">
                <form id="edit-board-form" action="http://localhost:3000/stacks/${id}/edit/save" method="post">
                    <div>
                        <input id="edit-title" type="text" name="title" value="${board.title}">
                        <div id="board-dates">
                            <p class="createdAt">
                                작성일: ${board.createdAt}
                            </p>
                            <p class="createdAt">
                                수정일: ${board.updatedAt}
                            </p>
                        </div>
                    </div>
                    <textarea id="edit-content" name="content">${board.content}</textarea>
                    <button id="edit-submit" type="submit">수정완료</button>
                </form>
            </div>
        </div>
    </body>
    </html>`

    res.send(output);
})

app.get('/stacks/write', (req, res) => {
    var output = `<!DOCTYPE html>
    <html lang="ko">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="/css/style.css">
        <title>My Stacks</title>
    </head>
    <body>
        <div id="container">
            <a href="http://localhost:3000">
                <h1 id="title">내가 다룰 수 있는 기술 스택 자랑하기</h1>
            </a>
            <div id="write-board">
                <form id="write-form" action="http://localhost:3000/stacks/write/save" method="post">
                    <input id="write-title" type="text" name="title" placeholder="제목을 입력하세요">
                    <textarea id="write-content" name="content" placeholder="내용을 입력하세요"></textarea>
                    <button id="submit-button" type="submit">작성완료</button>
                </form>
            </div>
        </div>
    </body>
    </html>`
    res.send(output);
})

app.post('/stacks/write/save', (req, res) => {
    const { title, content } = req.body;
    var board = {
        title: title,
        content: content,
        createdAt: dateFormat.dateFormat(),
        updatedAt: dateFormat.dateFormat(),
    };
    Board.push(board);
    res.redirect(`http://localhost:${port}/stacks`);
})

app.post('/stacks/:id/edit/save', (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    var board;

    for (var obj of Board) {
        if (Board.indexOf(obj) == id) {
            board = obj;
        }
    }

    board.title = title;
    board.content = content;
    board.updatedAt = dateFormat.dateFormat();

    res.redirect(`http://localhost:3000/stacks`);
})

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
})