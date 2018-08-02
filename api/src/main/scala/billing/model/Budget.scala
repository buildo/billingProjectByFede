package billing.model

import java.util.Date
import java.util.UUID

case class Budget(title: String,
                  uuid: Option[String],
                  value: Option[String],
                  notes: Option[String],
                  defaultPricePerDay: Option[String],
                  costs: Seq[Cost],
                  lastUpdate: Option[String],
                  creationDate: Option[String])
