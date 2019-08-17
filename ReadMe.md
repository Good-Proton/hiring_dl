- [Тестовое задание "data-layer"](#%d0%a2%d0%b5%d1%81%d1%82%d0%be%d0%b2%d0%be%d0%b5-%d0%b7%d0%b0%d0%b4%d0%b0%d0%bd%d0%b8%d0%b5-%22data-layer%22)
  - [Оценка трудоемкости](#%d0%9e%d1%86%d0%b5%d0%bd%d0%ba%d0%b0-%d1%82%d1%80%d1%83%d0%b4%d0%be%d0%b5%d0%bc%d0%ba%d0%be%d1%81%d1%82%d0%b8)
  - [Описание предметной области и назначения модуля](#%d0%9e%d0%bf%d0%b8%d1%81%d0%b0%d0%bd%d0%b8%d0%b5-%d0%bf%d1%80%d0%b5%d0%b4%d0%bc%d0%b5%d1%82%d0%bd%d0%be%d0%b9-%d0%be%d0%b1%d0%bb%d0%b0%d1%81%d1%82%d0%b8-%d0%b8-%d0%bd%d0%b0%d0%b7%d0%bd%d0%b0%d1%87%d0%b5%d0%bd%d0%b8%d1%8f-%d0%bc%d0%be%d0%b4%d1%83%d0%bb%d1%8f)
    - [Назначение модуля](#%d0%9d%d0%b0%d0%b7%d0%bd%d0%b0%d1%87%d0%b5%d0%bd%d0%b8%d0%b5-%d0%bc%d0%be%d0%b4%d1%83%d0%bb%d1%8f)
    - [`target` - список всех профилей для обработки](#target---%d1%81%d0%bf%d0%b8%d1%81%d0%be%d0%ba-%d0%b2%d1%81%d0%b5%d1%85-%d0%bf%d1%80%d0%be%d1%84%d0%b8%d0%bb%d0%b5%d0%b9-%d0%b4%d0%bb%d1%8f-%d0%be%d0%b1%d1%80%d0%b0%d0%b1%d0%be%d1%82%d0%ba%d0%b8)
    - [`queued` - список профилей, которые еще не были обработаны](#queued---%d1%81%d0%bf%d0%b8%d1%81%d0%be%d0%ba-%d0%bf%d1%80%d0%be%d1%84%d0%b8%d0%bb%d0%b5%d0%b9-%d0%ba%d0%be%d1%82%d0%be%d1%80%d1%8b%d0%b5-%d0%b5%d1%89%d0%b5-%d0%bd%d0%b5-%d0%b1%d1%8b%d0%bb%d0%b8-%d0%be%d0%b1%d1%80%d0%b0%d0%b1%d0%be%d1%82%d0%b0%d0%bd%d1%8b)
    - [`completed` - список обработанных профилей](#completed---%d1%81%d0%bf%d0%b8%d1%81%d0%be%d0%ba-%d0%be%d0%b1%d1%80%d0%b0%d0%b1%d0%be%d1%82%d0%b0%d0%bd%d0%bd%d1%8b%d1%85-%d0%bf%d1%80%d0%be%d1%84%d0%b8%d0%bb%d0%b5%d0%b9)
  - [Описание компонентов модуля](#%d0%9e%d0%bf%d0%b8%d1%81%d0%b0%d0%bd%d0%b8%d0%b5-%d0%ba%d0%be%d0%bc%d0%bf%d0%be%d0%bd%d0%b5%d0%bd%d1%82%d0%be%d0%b2-%d0%bc%d0%be%d0%b4%d1%83%d0%bb%d1%8f)
    - [`DB`](#db)
    - [`Source`](#source)
    - [`TargetCollection`, `QueuedCollection`, `CompletedCollection`](#targetcollection-queuedcollection-completedcollection)
  - [Список работ и функциональные требования](#%d0%a1%d0%bf%d0%b8%d1%81%d0%be%d0%ba-%d1%80%d0%b0%d0%b1%d0%be%d1%82-%d0%b8-%d1%84%d1%83%d0%bd%d0%ba%d1%86%d0%b8%d0%be%d0%bd%d0%b0%d0%bb%d1%8c%d0%bd%d1%8b%d0%b5-%d1%82%d1%80%d0%b5%d0%b1%d0%be%d0%b2%d0%b0%d0%bd%d0%b8%d1%8f)
  - [Требования к решению](#%d0%a2%d1%80%d0%b5%d0%b1%d0%be%d0%b2%d0%b0%d0%bd%d0%b8%d1%8f-%d0%ba-%d1%80%d0%b5%d1%88%d0%b5%d0%bd%d0%b8%d1%8e)
  - [Настройка окружения:](#%d0%9d%d0%b0%d1%81%d1%82%d1%80%d0%be%d0%b9%d0%ba%d0%b0-%d0%be%d0%ba%d1%80%d1%83%d0%b6%d0%b5%d0%bd%d0%b8%d1%8f)
  - [Установка и подготовка](#%d0%a3%d1%81%d1%82%d0%b0%d0%bd%d0%be%d0%b2%d0%ba%d0%b0-%d0%b8-%d0%bf%d0%be%d0%b4%d0%b3%d0%be%d1%82%d0%be%d0%b2%d0%ba%d0%b0)
  - [Критерии оценки решения:](#%d0%9a%d1%80%d0%b8%d1%82%d0%b5%d1%80%d0%b8%d0%b8-%d0%be%d1%86%d0%b5%d0%bd%d0%ba%d0%b8-%d1%80%d0%b5%d1%88%d0%b5%d0%bd%d0%b8%d1%8f)
  - [Самостоятельная проверка правильности решения](#%d0%a1%d0%b0%d0%bc%d0%be%d1%81%d1%82%d0%be%d1%8f%d1%82%d0%b5%d0%bb%d1%8c%d0%bd%d0%b0%d1%8f-%d0%bf%d1%80%d0%be%d0%b2%d0%b5%d1%80%d0%ba%d0%b0-%d0%bf%d1%80%d0%b0%d0%b2%d0%b8%d0%bb%d1%8c%d0%bd%d0%be%d1%81%d1%82%d0%b8-%d1%80%d0%b5%d1%88%d0%b5%d0%bd%d0%b8%d1%8f)

# Тестовое задание "data-layer"

Надо реализовать модуль `data-layer`, который отвечает за хранение и расчет информации об обработке списка профилей 
людей.

## Оценка трудоемкости
Оценка по времени: 3 рабочих дня. 1-2 день на проектирование схемы хранения и разработку алгоритмов, 1-2 дня на 
реализацию, проверку и тесты.

Код нашего решения имеет следующий объем *добавленного* кода: 
* `Source.ts` - `~100` значимых строк кода;
* `*Collection.ts` - `~30` значимых строк кода;
* тесты - `~200` значимых строк кода (это опционально)

Бенчмарк тест (`npm run perf`, `40K` профилей, `1000` удалений по `40` профилей, `1000` добавлений по `40` профилей) для
 нашего решения имел следующие показатели: размер БД был `~1.8MB` и тест исполнялся за `~27.5` секунд.

## Описание предметной области и назначения модуля
Модуль используется для решения задачи автоматизированной обработки большого кол-ва профилей людей. Модуль отвечает за 
хранение списка всех профилей для обработки (`target`), учета и хранения результатов обработки, расчет очереди 
*необработанных* профилей (`queued`) и расчет списка *обработанных* профилей (`completed`).

В общем, работу всей системы можно описать следующим образом: 
1. *пользователь* составляет список профилей для обработки и сохраняет его в `data-layer` в список `target`
2. *исполнитель* запрашивает из `data-layer` следующий профиль для обработки из списка `queued`, обрабытвает его и 
после этого сохраняет результат обработки в `data-layer` (для упрощения задания сохраняется просто сам факт обработки)
1. после этого *исполнитель* повторяет шаг 2, пока не обработает все профили
2. в любой момент *пользователь* может добавлять или удалять профили (в и из списка `target`), а также отправлять 
*обработанные* профили на повторную обработку (перемещение из `completed` в `queued`)

Каждый профиль `person` для упрощения задания представлен в модуле в виде его уникального идентификатора `PersonId`.
Предполагается, что характер обработки не зависит от конкретного профиля, соот-но очередь обработки `queued` 
представляет из себя просто список `PersonId`. Сохранение прогресса обработки происходит путем добавления записи об 
обработке кокретного профиля в таблицу результатов. После добавления нового результата содержимое списков тоже должно 
быть обновлено (касается `queued` и `completed` списков).

### Назначение модуля
Модуль должен предоставлять удобный способ работы со списками профилей: составление, редактирования и получение 
содержимого списка `target`; сохранения результатов обработки профилей; редактирование и получение содержимого списка 
`queued`; перенос из `completed` в `queued` и получение содержимого списка `completed`.

**Важно**: вся история изменения `target` должна быть сохранена. Должна быть принципиальная возможность вытащить из 
БД (в ручном режиме) содержимое списка `target` на любой момент в прошлом. Т.е. по факту, содержимое `target` списка 
должно версионироваться. Тоже самое относится и к спискам `queued` и `completed` (возможность вытащить содержимое 
списка на любой момент в прошлом).
**Важно**: все результаты обработки должны быть сохранены в БД. Т.е. удаление из `target` или перенос из `processed` в
 `queued` должно *скрывать*, а не удалять результат обработки.

### `target` - список всех профилей для обработки
`target` список хранит в себе все профили для обработки: и те, которые уже были обработаны и считаются *обработанными*, 
и те, которые стоят в очереди на обработку и считаются *необработанными*: `target` = `queued` + `completed` (под 
сложением тут подразумевается объединение). По сути `target` список отражает весь объем работы, которая должна быть 
произведена в целом.

В любой момент можно:
* добавить профили в `target` спискок (*новые* профили добавляются в конец списка, дубликаты игнорируются);
* удалить произвольные профили из `target` списка;
* ранее удаленные профили при их повторном добавлении считаются *необработанными*, даже, если для них уже есть 
сохраненный результат обработки, т.е. при удалении профиля из `target` существующий результат обработки должен считаться
 *скрытыи*.

### `queued` - список профилей, которые еще не были обработаны
`queued` список хранит в себе профили, которые считаются *необработанными*. Т.е. это та часть `target` списка, для 
которой еще не было записано результатов (или предыдущие результаты *скрыты*). По сути `queued` = `target` - `completed`
, т.е. этот список отражает объем предстоящей работы.

В любой момент можно:
* сохранить результат обработки, соот-но профиль должен быть перенесен из `queued` в `completed` и считаться 
*обработанным*;
* добавить *новые* профили в список `queued` (эквивалентно добавлению в `target`)
* удалить профили из этого списка (экививалетно удалению из `target`, но при этом удаляются только те профили, которые 
есть в `queued`);
* перенести существующие *обработанные* профили из `completed` в `queued` (эти профили после этого должны считаться 
*необработанными*, а существующие результаты обработки должны считаться *скрытыми*).

### `completed` - список обработанных профилей
`completed` список хранит в себе профили, считаются *обработанными*.

В любой момент можно:
* сохранить результат обработки, соот-но профиль должен быть перенесен из `queued` в `completed` и считаться 
*обработанным*;
* перенести существующие *обработанные* профили из `completed` в `queued`, после этого эти профили  должны считаться 
*необработанными*, а существующие результаты обработки должны считаться *скрытыми*.

## Описание компонентов модуля
Модуль состоит из нескольких компонентов: `DB`, `Source`, `TargetCollection`, `QueuedCollection`, `CompletedCollection`.

### `DB`
Класс `DB` предоставляет интерфейс для отправки запросов в БД (используется `Sqlite3`). Его модификация и доработка не 
треубется.

### `Source`
Основной компонент модуля - класс `Source`, который должен содержать в себе всю необходимую логику. Именно в нем должны 
происходить запросы к БД и обработка их результатов.

* `addToTarget(people: Iterable<PersonId>)`, `removeFromTarget(people: Iterable<PersonId>)` - редактирование `target` 
списка
* `addToQueue(people: Iterable<PersonId>)`, `removeFromQueue(people: Iterable<PersonId>)` - редактирование `queued` 
списка
* `saveResult(personId: PersonId)` - сохранение результата обработки
* и методы для получения содержимого списков (используются коллекциями)
* `getSize()` - отладочный метод, используемый для оценки результата, **менять нельзя**

### `TargetCollection`, `QueuedCollection`, `CompletedCollection`
Коллекции, реализующие списки `target`, `queued` и `completed`. Не содержат в себе непосредственно данные, а просто 
предоставляют удобный интерфейс для их получения.

* `.size`, `.length` - текущий размер коллекции (кол-во профилей в списке);
* `.first`, `.last` - первый и последний профили в списках;
* `[Symbol.asyncIterator]()` - асинхронный итератор по коллекции (
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/asyncIterator);
* `get(i: number)` - асинхронный метод получения элемента коллекции по индексу `i`;
* `slice(start?: number, end?: number)` - асинхронный метод получения части коллекции в виде массива `PersonId[]`, 
  работает аналогично `Array.slice(start, end)`.

## Список работ и функциональные требования
1. Необходимо запроектировать схему БД; запросы на создание таблиц поместить в `Source.initialize()`.
2. Реализовать `Source.addToTarget(people: Iterable<PersonId>)`: 
    * Все *новые* `PersonId` должны быть добавлены в конец списка `target`;
    * Все *дубликаты* `PersonId` должны быть проигнорированы и отброшены;
    * В терминах текущего содержимого списка предыстория не важна: если какой-то профиль был когда-то добавлен, а потом 
      удален, то последующее добавление должно *выглядеть* как добавление *нового* профиля;
    * При этом, в самой БД, вся эта история с добавление, удаление и последующим добавлением должна быть сохранена.
3. Реализовать `Source.removeFromTarget(people: Iterable<PersonId>)`:
    * те `PersonId`, которые и так отсутствуют в `target` должны быть проигнорированы;
    * те `PersonId`, которые есть в `target` должны быть удалены из него;
    * при последующем добавлении этого же `PersonId` в `target` он должен считаться *необработанным*, даже если до его 
      удаления для него был сохранен результат обработки;
    * при этом, в самой БД, вся эта история с добавление, удаление и последующим добавлением должна быть сохранена.
4. Реализовать `Source.addToQueue(people: Iterable<PersonId>)`:
    * все *новые* `PersonId` должны быть добавлены в конец списка `target` (эквивалетно `Source.addToTarget()`) и, 
    соот-но, они автоматически добавятся в конец списка `queued`;
    * все *дубликаты* `PersonId` (уже существующие в `queued`) должны быть проигнорированы и отброшены;
    * если `PersonId` был *обработанным*, то он должен быть перемещен из `completed` в `queued` и считаться 
      *необработанным*;
    * при этом, в самой БД, вся эта история с добавление, обработкой и перемещением должна быть сохранена.
5. Реализовать `Source.removeFromQueue(people: Iterable<PersonId>)`:
    * аналогично `Source.removeFromTarget()`, но только для тех `PersonId`, которые есть в списке `queued`;
    * при этом, в самой БД, вся история с добавление и удалением должна быть сохранена.
6. Релизовать `Source.clearTarget()`: 
    * Аналогично `Source.removeFromTarget()`, но только удаляются все `PersonId`.
7. Реализовать коллекции `TargetCollection`, `QueuedCollection`, `CompletedCollection`:
    * код не должен содержать в себе каких-либо `SQL` запросов;
    * `.size: Promise<number>`, `.length: Promise<number>` - текущий размер коллекции, релизовать в виде геттеров;
    * `.first: Promise<PersonId | undefined>`, `.last: Promise<PersonId | undefined>`  - первый и последний элементы 
      коллекции, релизовать в виде геттеров;
    * `[Symbol.asyncIterator](): IAsyncIterator<PersonId>` - реализовать итератор для коллекции, обратить внимание на 
      то, что итератор должен оставаться валидным при мутации коллекции: например, у нас в `target` лежит `[0, 1, 2]`, 
      начинаем итерации, берем первый элемент `0`, после этого пользователь удаляет из `target` первый элемент `0` и 
      добавляет еще пару элементов `[3, 4]` (итоговая коллекция - `[1, 2, 3, 4]`), при взятии следующего элемента, 
      итератор должен отдать второй элемент `1`, при взятии следующего - `2`, если в этот момент пользователь удалит из 
      таргета все элементы и добавит `[5, 6]` (итоговая коллекция - `[5, 6]`), при взятии следующего элемента итератор 
      вернет `5` и т.д.;
    * `.get(i: number): Promise<PersonId>` - реализовать метод взятия элемента по индексу, при этом должны 
      поддерживаться отрицательные индексы: `-1` вернет последний элемент, `-2` - препоследний и т.д.;
    * `.slice(start?: number, end?: number): Promise<PersonId[]>` - реализовать метод взятия части коллекции в виде 
      массива элементов, должен работать аналогично `Array.slice()`: `.slice()` - вернет всю коллекцию в виде массива, 
      `.slice(1, 3)` - вернет массив из второго и третьего элемента, `.slice(-1)` - вернет массив из последнего элемента 
      и т.д. (в тестах проверяется большая часть возможных случаев);
    * непосредственно сами запросы к БД должны быть реализованы в `Source`, коллекции просто обращаются к `Source` для 
      получения данных; соот-но необходимо будет спроектировать и реализовать необходимые методы `Source` (обратить 
      внимание на декораторы `@queued` и `@transaction`, разобраться, зачем они нужны и правильно их применить).
8. При разработке решения, надо учитывать, что размер списка `target` может доходить до 50000 профилей, в рамках одной 
кампании *пользователь* может сотни раз вносить изменения в `target` или `queued` списки, при этом обработка одного 
профиля *исполнителем* длится обычно от нескольких секунд до нескольких минут, а запросы на получение содержимого 
списков происходят пару раз в секунду и реже

## Требования к решению
* Отсутствие ошибок компиляции (настройки компиляции в `tsconfig.json` менять нельзя)
* Отсутствие ошибок линтинга (`npm run lint`, настройки линтинга менять нельзя)
* Существующие тесты должны проходиться без ошибок
* Подключать дополнительные модули и библиотеки нельзя

## Настройка окружения:
* `Node.js version >= 12`

## Установка и подготовка
* `npm install`

## Критерии оценки решения:
* за правильно функционирующее решение дается 5/10 баллов;
* +1/0/-1 балл можно получить за оформление кода, нейминг и т.д.
* +1/0/-1 балл можно получить за алгоритм и архитектуру решения (выбор правильной схемы хранения, учет специфики 
задачи при выборе между размером БД и скоростью)
* +1 бонусный балл можно получить за написание `spec` тестов для `QueuedCollection` и `CompletedCollection`
* +2 бонусных баллов можно получить за напписание `spec` тестов для `Source` и `100%` покрытие тестами `Source`, будут 
учитываться следующие моменты: покрытие логики и граничных случаев, читаемость и понятность тестов, общее оформление 
кода тестов

## Самостоятельная проверка правильности решения
`npm run test`
