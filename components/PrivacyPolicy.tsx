import { FC } from 'react';

interface PrivacyPolicyProps {
  onClose: () => void;
}

export const PrivacyPolicy: FC<PrivacyPolicyProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative max-w-2xl w-full mx-4 bg-gray-900 rounded-xl p-6 max-h-[80vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h2 className="text-2xl font-bold mb-6">🛡 Политика конфиденциальности</h2>
        <p className="text-gray-400 mb-4">Semantica AI</p>
        <p className="text-gray-400 mb-6">Обновлено: 21 мая 2025 года</p>
        <hr className="border-gray-700 mb-6" />

        <div className="prose prose-invert max-w-none space-y-6">
          <div>
            <h3 className="text-xl font-bold">1. Кто мы</h3>
            <p>
              Мы — AI-агентство Semantica AI, предоставляющее услуги по созданию no-code решений, автоматизации и визуального оформления с применением нейросетей.
            </p>
            <p>
              Контакты для связи:<br />
              Telegram: @Nikolai_Perepichko<br />
              Email: perepichko.nik@gmail.com
            </p>
          </div>
          
          <hr className="border-gray-700" />
          
          <div>
            <h3 className="text-xl font-bold">2. Какие данные мы собираем</h3>
            <p>
              Когда вы оставляете заявку на сайте, мы можем собирать:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Ваше имя</li>
              <li>Способ связи (email, Telegram, WhatsApp)</li>
              <li>Краткое описание задачи</li>
            </ul>
            <p>
              Мы не запрашиваем и не храним пароли, платежные данные, паспортные данные и другие чувствительные персональные данные.
            </p>
          </div>
          
          <hr className="border-gray-700" />
          
          <div>
            <h3 className="text-xl font-bold">3. Как мы используем данные</h3>
            <p>
              Собранные данные используются только для:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Связи с вами по поводу вашей заявки</li>
              <li>Подготовки индивидуального предложения</li>
              <li>Улучшения качества наших услуг</li>
            </ul>
          </div>
          
          <hr className="border-gray-700" />
          
          <div>
            <h3 className="text-xl font-bold">4. Как мы защищаем данные</h3>
            <p>
              Данные отправляются через защищённые каналы и не передаются третьим лицам. Мы используем только проверенные платформы (Telegram, облачные формы и почтовые сервисы).
            </p>
          </div>
          
          <hr className="border-gray-700" />
          
          <div>
            <h3 className="text-xl font-bold">5. Кто имеет доступ</h3>
            <p>
              Доступ к заявкам есть только у владельца агентства и уполномоченного менеджера, если таковой будет назначен.
            </p>
          </div>
          
          <hr className="border-gray-700" />
          
          <div>
            <h3 className="text-xl font-bold">6. Cookies и аналитика</h3>
            <p>
              Сайт может использовать cookies и аналитику (например, Yandex.Metrica или Google Analytics) — исключительно для улучшения пользовательского опыта. Вы можете отключить cookies в настройках браузера.
            </p>
          </div>
          
          <hr className="border-gray-700" />
          
          <div>
            <h3 className="text-xl font-bold">7. Ваши права</h3>
            <p>
              Вы можете в любой момент:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Запросить удаление или изменение своих данных</li>
              <li>Отозвать согласие на обработку данных</li>
              <li>Задать вопросы по хранению данных</li>
            </ul>
            <p>
              Для этого — напишите на hello@semantica.ai или в Telegram: @nikolai_ai_builder
            </p>
          </div>
          
          <hr className="border-gray-700" />
          
          <div>
            <h3 className="text-xl font-bold">8. Обновления политики</h3>
            <p>
              Мы можем обновлять эту политику. Последняя версия всегда доступна на сайте.
            </p>
          </div>
          
          <hr className="border-gray-700" />
          
          <div>
            <p className="font-bold">✅ Использование сайта означает согласие с данной политикой.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
