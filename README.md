
# 🍌 모두를 위한 바이브코딩 (Vibe Coding) 🍌

**비전공자를 위한 15주 Full-Stack 웹 개발 마스터 과정 예제 프로젝트**

<br>

https://github.com/fstone-dev/gen_coding/issues/1#issue-3520006130

<br>

> 이 저장소는 바이브코딩의 15주 웹 개발 교육 과정에서 진행된 모든 주차별 예제 프로젝트를 담고 있습니다. 웹 개발의 'W'자도 모르던 입문자가 **AI(Gemini CLI)와 협업**하여 **단계적 PRD(제품 요구사항 명세서)**를 작성하고, 순수 JavaScript 기반의 Full-Stack 애플리케이션을 완성해나가는 전체 여정을 기록합니다.

<br>

## 🚀 프로젝트의 여정 (Project Journey)

이 프로젝트는 단순한 코드 모음이 아닙니다. HTML의 기본 태그부터 시작하여, CSS로 디자인을 입히고, JavaScript로 생명을 불어넣고, Node.js와 MariaDB로 강력한 백엔드를 구축하기까지, 하나의 완전한 웹 애플리케이션이 탄생하는 과정을 단계별로 보여줍니다.

---

### 🏛️ Part 1: 기초 다지기 및 프론트엔드 입문 (1주차 ~ 8주차)

웹 개발의 기본 3요소(HTML, CSS, JS)를 익히고, 데이터베이스의 기초 개념을 학습하며 탄탄한 기본기를 다지는 단계입니다.

<details>
<summary><strong>- 🧱 1-2주차: 개발 환경 설정 및 첫걸음</strong></summary>

- **학습 목표:** 웹 개발의 기본 개념(프론트엔드/백엔드)을 이해하고, VS Code와 AI 코딩 어시스턴트(CLINE/Gemini CLI) 등 핵심 개발 도구를 설치하고 익숙해집니다.
- **주요 기술:** `VS Code`, `Node.js`, `npm`
- **결과물:** "Hello, World!" 수준의 간단한 웹 페이지 구조 생성 및 Live Server를 통한 확인.

</details>

<details>
<summary><strong>- 🎨 3-5주차: HTML 구조화, CSS 스타일링, AI 디자인</strong></summary>

- **학습 목표:** HTML로 웹 페이지의 의미 있는 구조를 설계하고, CSS로 디자인을 입히는 방법을 배웁니다. Stitch, Figma, Stable Diffusion과 같은 AI 디자인 도구를 활용하여 디자인 시안을 만들고 코드로 변환하는 과정을 경험합니다.
- **주요 기술:** `HTML5`, `CSS3`, `Figma MCP`, `AI 이미지 생성`
- **결과물:** AI가 생성한 디자인을 기반으로 제작된 정적인 '개인 프로필 및 관심사 소개' 페이지.

</details>

<details>
<summary><strong>- ✨ 6주차: JavaScript 인터랙션의 시작</strong></summary>

- **학습 목표:** JavaScript와 DOM(Document Object Model)의 기본 개념을 이해하고, 사용자의 행동(클릭 등)에 반응하여 웹 페이지의 내용이나 스타일을 동적으로 변경하는 방법을 학습합니다.
- **주요 기술:** `JavaScript(ES6)`, `DOM API`, `이벤트 리스너`
- **결과물:** 버튼 클릭 시 메시지를 출력하고, 특정 요소를 보이거나 숨기는 기능이 추가된 인터랙티브 프로필 페이지.

</details>

<details>
<summary><strong>- 🗄️ 7-8주차: 데이터베이스(MariaDB)의 세계 & 중간 프로젝트</strong></summary>

- **학습 목표:** 데이터 영속성의 필요성을 이해하고, 관계형 데이터베이스(RDBMS)의 핵심 개념(테이블, PK, FK 등)을 학습합니다. MariaDB를 설치하고 기본 SQL 명령어를 통해 데이터를 직접 조작합니다.
- **주요 기술:** `MariaDB`, `SQL(DDL, DML)`
- **결과물:**
    - 향후 Todo List 프로젝트에서 사용할 `todos` 테이블 스키마 설계 및 생성.
    - 1~7주차 기술을 총망라한 **중간 프로젝트**: 인터랙티브 기능이 포함된 완성도 높은 웹 페이지.

</details>

---

### 🚀 Part 2: Full-Stack 개발 및 미니 프로젝트 (9주차 ~ 14주차)

Node.js 기반의 백엔드 서버를 구축하고, 프론트엔드와 백엔드를 API로 연결하여 완전한 동적 웹 애플리케이션을 만드는 단계입니다. 이 단계부터는 **단계적 PRD**를 작성하여 AI와 체계적으로 협업합니다.

<details>
<summary><strong>- 🖥️ 9주차: Node.js와 백엔드의 시작</strong></summary>

- **학습 목표:** JavaScript가 브라우저를 벗어나 서버에서 동작하게 하는 Node.js의 개념과 비동기 I/O 모델을 이해합니다. Express.js 프레임워크를 사용하여 첫 웹 서버를 구축합니다.
- **주요 기술:** `Node.js`, `Express.js`, `비동기 처리 (Promise, async/await)`
- **결과물:** "Hello, World!"를 응답하는 간단한 API 서버.

</details>

<details>
<summary><strong>- 🧮 10주차: 미니 프로젝트 2 - 웹 계산기</strong></summary>

- **학습 목표:** 클라이언트 측 JavaScript의 복잡한 로직 처리 능력을 기르고, Node.js 서버가 정적 파일(HTML/CSS/JS)을 사용자에게 제공하는 역할을 수행하는 Full-Stack의 기본 구조를 경험합니다.
- **주요 기술:** `JavaScript 로직 심화`, `Express 정적 파일 서빙`
- **결과물:** Node.js 서버 위에서 동작하는 완전한 기능의 웹 계산기 애플리케이션.

</details>

<details>
<summary><strong>- ✅ 11-12주차: 미니 프로젝트 3 - Todo List (Full-Stack CRUD)</strong></summary>

- **학습 목표:** 데이터의 전체 생명주기(CRUD: Create, Read, Update, Delete)를 처리하는 RESTful API를 설계하고 구현합니다. 프론트엔드에서는 `fetch` API를 사용하여 백엔드와 통신하고, 응답 데이터를 기반으로 UI를 동적으로 렌더링합니다.
- **주요 기술:** `RESTful API`, `Node.js-MariaDB 연동(mysql2)`, `fetch API`
- **결과물:** 데이터베이스에 할 일 목록이 영구적으로 저장되는 완전한 Full-Stack Todo List 애플리케이션.

</details>

<details>
<summary><strong>- 📔 13주차: 미니 프로젝트 5 - 나만의 일기장 (SPA)</strong></summary>

- **학습 목표:** 페이지 새로고침 없이 여러 화면(뷰)을 동적으로 전환하는 SPA(Single Page Application)의 기본 구조를 구현합니다. 이를 통해 앱과 같은 부드러운 사용자 경험을 제공하는 방법을 학습합니다.
- **주요 기술:** `SPA(Single Page Application) 구현`, `동적 뷰 렌더링`
- **결과물:** 목록, 상세 보기, 글쓰기/수정 화면이 동적으로 전환되는 Full-Stack 일기장 애플리케이션.

</details>
<details>
<summary><strong>- 🎮 14주차: 미니 프로젝트 4 - 오목 게임 (로직/알고리즘 심화)</strong></summary>

- **학습 목표:** 서버 없이 순수 JavaScript만으로 복잡한 게임 로직과 상태(2D 배열)를 관리하는 능력을 기릅니다. 승리 판정 알고리즘을 직접 설계하며 알고리즘적 사고를 훈련합니다.
- **주요 기술:** `2D 배열`, `게임 상태 관리`, `알고리즘 구현`, `이벤트 위임`
- **결과물:** 로컬 2인용으로 플레이 가능한 인터랙티브 오목 게임.

</details>

---

## 🛠️ 주요 기술 스택 (Tech Stack)

*   **Frontend:** `HTML5`, `CSS3`, `JavaScript (ES6+)`
*   **Backend:** `Node.js`, `Express.js`
*   **Database:** `MariaDB`
*   **AI Collaboration Tool:** `Gemini CLI` / `CLINE`
*   **Core Concepts:** `RESTful API`, `SPA`, `MVC Pattern`, `CRUD`, `State Management`, `Asynchronous Programming`

<br>

## 📖 학습 방법

각 주차별 폴더에는 해당 주차에 완성된 프로젝트 코드가 포함되어 있습니다. 코드와 함께 주석, 그리고 각 폴더 내의 `README.md` 파일(필요시)을 통해 해당 주차의 핵심 학습 내용을 복습할 수 있습니다.

이 저장소를 통해 바이브코딩과 함께라면 누구나 아이디어를 현실로 만드는 웹 개발자가 될 수 있다는 것을 보여주고자 합니다.
