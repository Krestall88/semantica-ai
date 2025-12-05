import { FC } from 'react';

interface PrivacyPolicyProps {
  onClose: () => void;
}

export const PrivacyPolicy: FC<PrivacyPolicyProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="relative max-w-2xl w-full bg-[#12121A] rounded-2xl p-8 max-h-[85vh] overflow-y-auto border border-white/10">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h2 className="text-2xl font-bold mb-6">Политика конфиденциальности</h2>
        <p className="text-gray-400 mb-2">SemanticaAI — Студия автоматизации бизнес-процессов</p>
        <p className="text-gray-500 text-sm mb-6">Обновлено: 1 декабря 2025 года</p>
        <hr className="border-white/10 mb-6" />

        <div className="prose prose-invert max-w-none space-y-6 text-gray-300">
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">1. Кто мы</h3>
            <p className="mb-3">
              SemanticaAI — студия прикладной автоматизации и разработки операционных систем для бизнеса. 
              Мы создаём индивидуальные ERP/CRM-системы, автоматизации и AI-модули.
            </p>
            <p>
              <strong className="text-white">Контакты:</strong><br />
              Telegram: <a href="https://t.me/Nikolai_Perepichko" className="text-blue-400 hover:underline">@Nikolai_Perepichko</a><br />
              Email: <a href="mailto:perepichko.nik@gmail.com" className="text-blue-400 hover:underline">perepichko.nik@gmail.com</a>
            </p>
          </div>
          
          <hr className="border-white/10" />
          
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">2. Какие данные мы собираем</h3>
            <p className="mb-3">При оставлении заявки на сайте мы можем собирать:</p>
            <ul className="list-disc pl-6 space-y-1 text-gray-400">
              <li>Ваше имя</li>
              <li>Способ связи (Telegram, WhatsApp, телефон, email)</li>
              <li>Описание процесса или задачи</li>
            </ul>
            <p className="mt-3 text-gray-500 text-sm">
              Мы не запрашиваем и не храним пароли, платежные данные, паспортные данные и другие чувствительные персональные данные.
            </p>
          </div>
          
          <hr className="border-white/10" />
          
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">3. Как мы используем данные</h3>
            <p className="mb-3">Собранные данные используются только для:</p>
            <ul className="list-disc pl-6 space-y-1 text-gray-400">
              <li>Связи с вами по поводу вашей заявки</li>
              <li>Подготовки индивидуального предложения</li>
              <li>Проведения аудита и консультаций</li>
            </ul>
          </div>
          
          <hr className="border-white/10" />
          
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">4. Как мы защищаем данные</h3>
            <p className="text-gray-400">
              Данные отправляются через защищённые каналы и не передаются третьим лицам. 
              Мы используем только проверенные платформы (Telegram, защищённые формы).
            </p>
          </div>
          
          <hr className="border-white/10" />
          
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">5. Кто имеет доступ</h3>
            <p className="text-gray-400">
              Доступ к заявкам есть только у основателя студии — Николая Перепичко.
            </p>
          </div>
          
          <hr className="border-white/10" />
          
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">6. Cookies и аналитика</h3>
            <p className="text-gray-400">
              Сайт может использовать cookies и аналитику для улучшения пользовательского опыта. 
              Вы можете отключить cookies в настройках браузера.
            </p>
          </div>
          
          <hr className="border-white/10" />
          
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">7. Ваши права</h3>
            <p className="mb-3">Вы можете в любой момент:</p>
            <ul className="list-disc pl-6 space-y-1 text-gray-400">
              <li>Запросить удаление или изменение своих данных</li>
              <li>Отозвать согласие на обработку данных</li>
              <li>Задать вопросы по хранению данных</li>
            </ul>
            <p className="mt-3">
              Для этого напишите в Telegram: <a href="https://t.me/Nikolai_Perepichko" className="text-blue-400 hover:underline">@Nikolai_Perepichko</a>
            </p>
          </div>
          
          <hr className="border-white/10" />
          
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">8. Обновления политики</h3>
            <p className="text-gray-400">
              Мы можем обновлять эту политику. Последняя версия всегда доступна на сайте.
            </p>
          </div>
          
          <hr className="border-white/10" />
          
          <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4">
            <p className="text-green-400 font-medium">✓ Использование сайта означает согласие с данной политикой.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
