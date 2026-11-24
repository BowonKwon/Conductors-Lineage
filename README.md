# 지휘의 계보 · Conductors' lineage

지휘자가 누구에게 배웠고 누구 밑에서 부지휘자·어시스턴트로 일했는지를, 관계마다 출처를 밝히고 되도록 그것을 말하는 출처의 문장을 함께 실은 사이트입니다. 비상업 교육용이며, 지금 판은 독립 검증이 끝나기 전의 **0.2 탐색판**입니다.

A site that draws who taught each conductor and under whom each one worked as an assistant conductor, with its source, and wherever possible the source sentence, beside every relation. It is noncommercial and educational; the current release is **exploratory edition 0.2**, published before independent verification is complete.

- 사이트 · Site: https://bowonkwon.github.io/Conductors-Lineage/

## 내용 · Contents

| 면 · Page | 내용 · What it holds |
|---|---|
| 계보 그림 · Lineage chart | 태어난 해 순으로 놓은 사람들과 스승→제자 화살표, 관계마다 출처와, 있으면 그 문장(또는 요지) · People by year of birth with teacher-to-pupil arrows, and each relation's source with its quotation or paraphrase where there is one |
| 인물 찾기와 계보 나무 · Find a person | 이름으로 찾아 스승 쪽과 제자 쪽을 세 세대까지 · Look up a name and follow teachers and pupils for three generations |
| 교향악축제 · Orchestra Festival | 예술의전당 교향악축제 1989~2026년 출연 악단과 지휘자 · Orchestras and conductors of the Orchestra Festival at the Seoul Arts Center, 1989–2026 |
| 축제 레퍼토리 · Festival repertoire | 교향악축제 2022~2026년 공연에 오른 곡의 작곡가·갈래·독주 악기·편성 · Composers, kinds of work and solo instruments and groups of the works programmed at the Orchestra Festival, 2022–2026 |
| 방법과 출처 · Method and sources | 관계의 종류, 「확정」의 기준, 명단을 고른 규칙, 17개 악단 재임표 · Kinds of relation, what counts as confirmed, how people were chosen, tenure tables of 17 orchestras |
| 알려진 한계 · Known limits | 그리지 않은 것과 확인하지 못한 것 · What is not drawn and what could not be confirmed |

## 관계를 세는 규칙 · How relations are counted

- **정식 수학 · Formal study** — 음악원 과정이나 개인 교습 · a conservatory course or private lessons. 두 수학을 가르는 기준은 한결같지 않습니다(「알려진 한계」 면). · The line between formal and short study is uneven (see Known limits).
- **부지휘·어시스턴트 · Assistant** — 윗사람의 이름이 출처에 나오는 부지휘자·어시스턴트·코레페티토르. 악장(콘서트마스터)은 넣지 않습니다. · assistant conductor, associate conductor or répétiteur under a named conductor; concertmasters are not counted.
- **짧은 수학 · Short study** — 마스터클래스, 여름 강습 · a master class or a summer course.
- **확정 · Confirmed** — 위키백과가 아닌 출처의 원문에서 그 관계를 말하는 문장을 읽은 경우. **출처 엇갈림 · Sources disagree** — 출처끼리 다른 경우(양쪽을 모두 싣습니다). **후보 · Candidate** — 위키백과나 위키데이터에만 있거나 다른 출처로 확인하지 못한 경우(그리지 않고 데이터 파일에만 둡니다).
- Confirmed: the sentence stating the relation was read in a source other than Wikipedia. Sources disagree: both sides are shown. Candidate: found only in Wikipedia or Wikidata or not confirmed in another source; kept in the data file and not drawn.

## 데이터 · Data

`data/` 의 CSV(UTF-8)는 사이트가 쓰는 표입니다. The CSV files in `data/` (UTF-8) are the tables behind the site.

| 파일 · File | 내용 · Contents |
|---|---|
| `persons.csv` | 사람: 번호, 한글·로마자 이름, 생몰년, 위키데이터 번호, 명단 안팎, 표시 · people: ID, Korean and Latin names, years of birth and death, Wikidata ID, on or outside the list, marks |
| `relations.csv` | 관계의 출처 줄 전부(후보 포함): 스승, 제자, 종류, 상태, 과목, 연도, 장소, 출처, 인용 구절, 주소, 확인한 날 · every source row of a relation, candidates included |
| `tenures.csv` | 17개 악단 수장·객원·부지휘 재임표 · tenure tables of 17 orchestras |
| `festival.csv` | 교향악축제 출연 기록 · appearance records of the Orchestra Festival |
| `festival_works.csv` | 교향악축제 2022~2026년 공연에 오른 곡(작곡가, 제목, 갈래, 독주 악기, 공연 면에 적힌 줄) · works programmed at the Orchestra Festival, 2022–2026 (composer, title, kind, solo instrument, the line as printed on the concert page) |

- 출처의 문장은 짧은 인용으로만 싣습니다. 사진과 음반 표지는 싣지 않습니다. · Sentences from sources are reproduced only as short quotations. No photographs or record covers are included.
- 자동 수집을 금지한다고 밝힌 사이트는 열지 않았고, 그런 사이트에서 나온 근거는 지웠습니다. · Sites that disallow automated collection were not opened, and evidence that had come from such sites was removed.
- 위키데이터 번호는 사람을 가리키는 데에만 씁니다. · Wikidata IDs are used only to identify people.

## 알려 주세요 · Corrections

틀린 관계, 빠진 출처, 잘못된 이름 표기는 [이슈](https://github.com/BowonKwon/Conductors-Lineage/issues)로 알려 주시면 고칩니다. 출처의 서지와 해당 문장을 함께 적어 주시면 바로 확인할 수 있습니다.

Please report wrong relations, missing sources and misspelled names through the [issues](https://github.com/BowonKwon/Conductors-Lineage/issues). A citation with the sentence in question makes a report quick to check.

## 판 · Versions

- **0.2.1** (2026-11) — 그래프 설명을 풀어 썼습니다. 그림 여덟 개(계보 그림, 계보 나무, 교향악축제 해마다 공연 수, 레퍼토리 그림 셋, 「방법과 출처」의 과목·출처 그림)마다 그림 위에 한 줄 소개를, 아래에 「한눈에」 「그림 보는 법」 「숫자 하나 읽어 보기」 「수로 보면」 「잘못 읽기 쉬운 것」 「낱말 풀이」를 필요한 만큼 두었습니다. 설명 속 수는 자료에서 계산해 넣습니다. 자료와 그림의 값, 표는 바뀌지 않았습니다. · Plainer figure explanations. Each of the eight charts (the lineage chart, the lineage tree, Orchestra Festival concerts by year, the three repertoire charts, and the subject and source charts on the Method page) now has a one-line introduction above it and, as needed, named paragraphs below it: In short, How the chart works, Reading one value, The numbers, Easy to misread, Terms. The numbers in them are computed from the data. Data, chart values and tables are unchanged.
- **0.2 탐색판 · exploratory edition** (2026-11) — 위키백과에만 있어 후보로 두었던 출처 줄을 다른 출처로 다시 확인했습니다. 원문에서 문장을 읽은 줄은 그리는 줄로 올리고, 그 스승들을 인물표에 더했습니다. 같은 관계가 두 번 들어간 줄을 합쳤고, 「방법과 출처」와 「알려진 한계」 면에 그 경과를 적었습니다. 수치는 면에 있습니다. · The source rows kept as candidates because they rested on Wikipedia alone were checked again in other sources. Rows whose sentence was read in such a source are now drawn, and their teachers were added to the table of people. Rows that entered the same relation twice were merged, and the Method and Known limits pages describe the re-check. The numbers are on the pages.
- **0.1.2** (2026-11) — 화면만 고쳤습니다. 헤더가 화면 위에 붙지 않는 폭(1024px 아래)에서 아래로 내려가도 언어를 바꿀 수 있게, 오른쪽 아래에 언어 전환 단추를 띄웁니다. 값은 바뀌지 않았습니다. · Display only. At widths where the header does not stay on screen (below 1024px) a language switch now floats at the bottom right, so the language can be changed further down the page. No values changed.
- **0.1.1** (2026-11) — 목차에서 절로 바로 가기. 절이 셋 이상인 면에 절 목록을 두고, 절 제목마다 바로가기 링크를 달았습니다. 넓은 화면에서는 위쪽 메뉴가 화면에 남습니다. 축제 레퍼토리 면에 「서양 고전 음악 메트릭스」로 가는 링크 한 줄을 더했고, 그 밖의 본문과 수치는 그대로입니다. · Straight from the contents to a section: a section list on pages with three or more sections, and a link on every section heading. On wide screens the top menu stays on screen. A link to Classical Music Metrics was added on the festival repertoire page; other text and numbers are unchanged.
- **0.1 탐색판 · exploratory edition** (2026-11) — 계보 그림, 인물 찾기와 계보 나무, 교향악축제, 방법과 출처, 알려진 한계. · Lineage chart, Find a person, Orchestra Festival, Method and sources, Known limits.

## 라이선스 · License

[LICENSE.md](LICENSE.md)
